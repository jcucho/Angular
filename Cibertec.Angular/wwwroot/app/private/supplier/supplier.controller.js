(function () {
    'use strict';
    angular.module('app').controller('supplierController', supplierController);

    supplierController.$inject = ['dataService', 'configService', '$state', '$scope'];

    function supplierController(dataService, configService, $state, $scope) {
        var apiUrl = configService.getApiUrl();
        var vm = this;

        //Propiedades
        vm.supplier = {};
        vm.supplierList = [];
        vm.modalButtonTitle = '';
        vm.readOnly = false;
        vm.isDelete = false;
        vm.modalTitle = '';
        vm.showCreate = false;
        vm.totalRecords = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.itemsPerPage = 30;

        //Funciones
        vm.getSupplier = getSupplier;
        vm.create = create;
        vm.edit = edit;
        vm.delete = supplierDelete;
        vm.pageChanged = pageChanged;
        vm.closeModal = closeModal;

        init();

        function init() {
            if (!configService.getLogin()) return $state.go('login');
            configurePagination()
        }

        function configurePagination() {
            //In case mobile just show 5 pages
            var widthScreen = (window.innerWidth > 0) ?
                window.innerWidth : screen.width;
            if (widthScreen < 420) vm.maxSize = 5;
            totalRecords();
        }

        function pageChanged() {
            getPageRecords(vm.currentPage);
        }

        function totalRecords() {
            dataService.getData(apiUrl + '/supplier/count')
                .then(function (result) {
                    vm.totalRecords = result.data;
                    getPageRecords(vm.currentPage);
                }
                , function (error) {
                    console.log(error);
                });
        }

        function getPageRecords(page) {
            dataService.getData(apiUrl + '/supplier/list/' + page + '/'
                + vm.itemsPerPage)
                .then(function (result) {
                    vm.supplierList = result.data;
                },
                function (error) {
                    vm.supplierList = [];
                    console.log(error);
                });
        }

        function getSupplier(id) {
            vm.supplier = null;
            dataService.getData(apiUrl + '/supplier/' + id)
                .then(function (result) {
                    vm.supplier = result.data;
                },
                function (error) {
                    vm.supplier = null;
                    console.log(error);
                });
        }        function updateSupplier() {
            if (!vm.supplier) return;
            dataService.putData(apiUrl + '/supplier', vm.supplier)
                .then(function (result) {
                    vm.supplier = {};                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    vm.supplier = {};
                    console.log(error);
                });
        }        function createSupplier() {
            if (!vm.supplier) return;
            dataService.postData(apiUrl + '/supplier', vm.supplier)
                .then(function (result) {
                    getSupplier(result.data);
                    detail();
                    getPageRecords(1);
                    vm.currentPage = 1;
                    vm.showCreate = true;
                },
                function (error) {
                    console.log(error);
                    closeModal();
                });
        }        function deleteSupplier() {
            dataService.deleteData(apiUrl + '/supplier/' +
                vm.supplier.id)
                .then(function (result) {
                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    console.log(error);
                });
        }

        function create() {
            vm.supplier = {};
            vm.modalTitle = 'Create Supplier';
            vm.modalButtonTitle = 'Create';
            vm.readOnly = false;
            vm.modalFunction = createSupplier;
            vm.isDelete = false;
        }

        function edit() {
            vm.showCreate = false;
            vm.modalTitle = 'Edit Supplier';
            vm.modalButtonTitle = 'Update';
            vm.readOnly = false;
            vm.modalFunction = updateSupplier;
            vm.isDelete = false;
        }

        function detail() {
            vm.modalTitle = 'The New Supplier Created';
            vm.modalButtonTitle = '';
            vm.readOnly = true;
            vm.modalFunction = null;
            vm.isDelete = false;
        }

        function supplierDelete() {
            vm.showCreate = false;
            vm.modalTitle = 'Delete Supplier';
            vm.modalButtonTitle = 'Delete';
            vm.readOnly = false;
            vm.modalFunction = deleteSupplier;
            vm.isDelete = true;
        }

        function closeModal() {
            angular.element('#modal-container').modal('hide');
        }
    }
})();