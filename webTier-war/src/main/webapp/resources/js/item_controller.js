"use strict";
App.controller("ItemController", ["$scope", "ItemService", "$location", function ($scope, ItemService, $location) {
    let self = this;
    let REST_SERVICE_URI = map[$location.path()];
    let TYPES_URI = "/laba/types/";
    let BRANDS_URI = "/laba/brands/";
    let keyword = "";
    keyword = $location.search()["keyword"];
    let file = $scope.myFile;
    self.item = {id: null, name: "", objectType: null, parameters: [], parent: {}};
    self.items = {number: 0, content: []};
    self.types = [];
    self.type = {
        id: null,
        name: "",
        parent: null,
        icon: "fa fa-picture-o",
        product: true,
        attributes: [{id: null, name: "", objectType: null}]
    };
    self.files = [];
    self.count = 0;
    self.brands = [];
    self.shop = "";
    self.hide = true;
    self.submit = submit;
    self.getProducts = getProducts;
    self.getIcons = getIcons;
    self.submitType = submitType;
    self.update = update;
    self.icons = [];
    self.edit = edit;
    self.addAttr = addAttr;
    self.editPage = editPage;
    self.remove = remove;
    self.reset = reset;
    self.resetAdd = resetAdd;
    self.resetType = resetType;
    self.selectType = selectType;
    self.setParent = setParent;
    self.show = show;
    self.buy = buy;
    self.goToPage = goToPage;
    self.uploadFile = uploadFile;
    self.setIcon = setIcon;
    self.reqIcon = reqIcon;
    fetchAllItems();
    fetchAllTypes();
    fetchAllBrands();
    getIcons();
    function update() {
        self.item = $scope.selectedItem;
    }
    function setParent() {
        self.type.parent = {id: null};
        self.type.parent.id = $scope.selectedItem;
    }
    function getProducts(name) {
        self.shop = "/"+name;
        ItemService.fetchAllItems(map[$location.path()] + self.shop + "/" + 1)
            .then(
                function (d) {
                    self.items = d;
                }
            );
    }
    function getIcons() {
        ItemService.fetchAllItems("/laba/my-icons/")
            .then(
                function (d) {
                    self.icons = d;
                }
            );
    }
    function addAttr() {
        self.type.attributes.push({id: null, name: "", objectType: {id: null}});
    }

    function goToPage(page) {
        if (!keyword) {
            keyword = "";
        } else {
            self.shop="";
        }
        ItemService.fetchAllItems(map[$location.path()] +self.shop + keyword + "/" + page)
            .then(
                function (d) {
                    self.items = d;
                }
            );
    }

    function fetchAllItems() {
        let URI = REST_SERVICE_URI;
        if (REST_SERVICE_URI === "/laba/products") {
            let n = self.items.number + 1;
            URI = REST_SERVICE_URI + "/" + n;
        } else if (REST_SERVICE_URI === "/laba/request/") {
            let n = self.items.number + 1;
            URI = REST_SERVICE_URI + keyword + "/" + n;
        }
        ItemService.fetchAllItems(URI)
            .then(
                function (d) {
                    self.items = d;
                }
            );
    }

    function fetchAllTypes() {
        ItemService.fetchAllItems(TYPES_URI)
            .then(
                function (d) {
                    self.types = d;
                }
            );
    }

    function fetchAllBrands() {
        ItemService.fetchAllItems(BRANDS_URI)
            .then(
                function (d) {
                    self.brands = d;
                }
            );
    }

    function buy(id) {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            url: "addToCart",
            data: ({itemId: id}),
            success () {
                $scope.updateIndex();
            }
        });
    }

    function showItem(id) {
        ItemService.showItem(id, "/laba/phone/")
            .then(
                function (d) {
                    self.items = d;
                }
            );
    }

    function createItem(item) {
        ItemService.createItem(item, "/laba/phone/")
            .then(
                uploadFile
            );
    }

    function updateItem(item) {
        ItemService.updateItem(item, "/laba/phone/")
            .then(
                uploadFile
            );
    }

    function deleteItem(id) {
        ItemService.deleteItem(id, "/laba/phone/")
            .then(
                fetchAllItems
            );
    }

    function show(id) {
        showItem(id);
    }

    function submit() {
            updateItem(self.item);
            angular.element(document.querySelector("#addModal")).modal("hide");
            angular.element(document.querySelector("#editModal")).modal("hide");
            resetAdd();
            reset();
    }
    function submitType() {
        ItemService.updateItem(self.type, "/laba/save-type/")
            .then(
                fetchAllTypes
            );
        angular.element(document.querySelector("#editTypesModal")).modal("hide");
        resetType();
    }

    function edit(id) {
        for (let i = 0; i < self.items.length; i++) {
            if (self.items[i].id === id) {
                self.item = angular.copy(self.items[i]);
                break;
            }
        }
    }

    function editPage(id) {
        for (let i = 0; i < self.items.content.length; i++) {
            if (self.items.content[i].id === id) {
                self.item = angular.copy(self.items.content[i]);
                break;
            }
        }
    }

    function remove(id) {
        if (self.item.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteItem(id);
    }

    function reset() {
        self.item = {id: null, name: "", objectType: null, parameters: [], parent: {}};
        $scope.myForm.$setPristine(); //reset Form
    }

    function resetAdd() {
        if(angular.isDefined($scope.selectedItem)){
            delete $scope.selectedItem;
        }
        self.item = {};
        $scope.addForm.$setPristine();
    }
    function resetType() {
        if(angular.isDefined($scope.selectedItem)){
            delete $scope.selectedItem;
        }
        self.type = {
            id: null,
            name: "",
            parent: null,
            icon: "fa fa-picture-o",
            product: true,
            attributes: [{id: null, name: "", objectType: null}]
        };
        $scope.typeForm.$setPristine();
    }
    function selectType(type) {
        self.type = type;
        try {
            $scope.selectedItem = type.parent.id;
        }catch(e){
            $scope.selectedItem = "";
        }
        $scope.typeForm.$setPristine();
    }
    function setIcon(name) {
        self.hide=true;
        self.type.icon = name;
        $scope.typeForm.$setPristine();
    }
    function reqIcon() {
        if(self.hide === true) {
            self.hide = false;
        }else{
            self.hide = true;
        }
        $scope.typeForm.$setPristine();
    }
    function uploadFile(data) {
        let uploadUrl = "/laba/fileUpload";
        ItemService.uploadFileToUrl(self.files, uploadUrl, data)
            .then(
                fetchAllItems
            );
    }

}])
    .directive("fileModel", ["$parse", function ($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                let model = $parse(attrs.fileModel);
                let modelSetter = model.assign;
                element.bind("change", function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .directive("owlCarousel", function ($window) {
        return {
            restrict: "E",
            transclude: false,
            link (scope) {
                scope.initCarousel = function (element) {
                    let defaultOptions = {};
                    let options = {
                        autoplay: false,
                        autoplayTimeout: 2500,
                        loop: false, nav: true,
                        responsiveClass: true,
                        margin: 30,
                        responsive: {
                            0: {items: 1},
                            640: {items: 2},
                            1000: {items: 3},
                            1180: {items: 4}
                        }
                    };
                    let customOptions = scope.$eval($(element).attr("data-options"));
                    // combine the two options objects
                    for (let key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    $(element).owlCarousel(options);
                };
                scope.destroy = function (element) {
                    $(element).data("owlCarousel").destroy();
                };

            }
        };
    })
    .directive("owlCarouselItem", [function () {
        return {
            restrict: "A",
            transclude: false,
            link (scope, element) {
                // wait for the last item in the ng-repeat then call init
                scope.$watch("item", function () {
                    if ($(element.parent()).data("owlCarousel") === undefined) {
                        if (scope.$last) {
                            scope.initCarousel(element.parent());
                        }
                    } else {
                        scope.destroy(element.parent());
                        let queryResult = element[0].querySelector(".owl-stage:last-child");
                        let stage = angular.element(queryResult);
                    }
                });
            }
        };
    }]);