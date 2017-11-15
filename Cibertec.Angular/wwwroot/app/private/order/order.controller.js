(function () {
    'use strict';
    angular.module('app').controller('orderController', orderController);

    orderController.$inject = ['dataService', 'configService', '$state', '$scope'];

    function orderController(dataService, configService, $state, $scope) {
        var apiUrl = configService.getApiUrl();
        var vm = this;

        //Propiedades
        vm.order = {};
        vm.orderList = [];
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
        vm.getOrder = getOrder;
        vm.create = create;
        vm.edit = edit;
        vm.delete = orderDelete;
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
            dataService.getData(apiUrl + '/order/count')
                .then(function (result) {
                    vm.totalRecords = result.data;
                    getPageRecords(vm.currentPage);
                }
                , function (error) {
                    console.log(error);
                });
        }

        function getPageRecords(page) {
            dataService.getData(apiUrl + '/order/list/' + page + '/'
                + vm.itemsPerPage)
                .then(function (result) {
                    vm.orderList = result.data;
                },
                function (error) {
                    vm.orderList = [];
                    console.log(error);
                });
        }

        function getOrder(id) {
            vm.order = null;
            dataService.getData(apiUrl + '/order/' + id)
                .then(function (result) {
                    vm.order = result.data;
                },
                function (error) {
                    vm.order = null;
                    console.log(error);
                });
        }        function updateOrder() {
            if (!vm.order) return;
            dataService.putData(apiUrl + '/order', vm.order)
                .then(function (result) {
                    vm.order = {};                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    vm.order = {};
                    console.log(error);
                });
        }        function createOrder() {
            if (!vm.order) return;
            dataService.postData(apiUrl + '/order', vm.order)
                .then(function (result) {
                    getOrder(result.data);
                    detail();
                    getPageRecords(1);
                    vm.currentPage = 1;
                    vm.showCreate = true;
                },
                function (error) {
                    console.log(error);
                    closeModal();
                });
        }        function deleteOrder() {
            dataService.deleteData(apiUrl + '/order/' +
                vm.order.id)
                .then(function (result) {
                    getPageRecords(vm.currentPage);
                    closeModal();
                },
                function (error) {
                    console.log(error);
                });
        }

        function create() {
            vm.order = {};
            vm.modalTitle = 'Create Order';
            vm.modalButtonTitle = 'Create';
            vm.readOnly = false;
            vm.modalFunction = createOrder;
            vm.isDelete = false;
        }

        function edit() {
            vm.showCreate = false;
            vm.modalTitle = 'Edit Order';
            vm.modalButtonTitle = 'Update';
            vm.readOnly = false;
            vm.modalFunction = updateOrder;
            vm.isDelete = false;
        }

        function detail() {
            vm.modalTitle = 'The New Order Created';
            vm.modalButtonTitle = '';
            vm.readOnly = true;
            vm.modalFunction = null;
            vm.isDelete = false;
        }

        function orderDelete() {
            vm.showCreate = false;
            vm.modalTitle = 'Delete Order';
            vm.modalButtonTitle = 'Delete';
            vm.readOnly = false;
            vm.modalFunction = deleteOrder;
            vm.isDelete = true;
        }

        function closeModal() {
            angular.element('#modal-container').modal('hide');
        }
    }
})();