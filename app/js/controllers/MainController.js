app.controller('MainController', ['$scope', function ($scope) {

    //Navbar//
    $scope.homeMenu = true;
    $scope.toggleActive = function (menu) {
        $scope.homeMenu = false;
        $scope.formMenu = false;
        $scope.tableMenu = false;
        $scope.contactMenu = false;

        $scope[menu] = true;
    };
    $scope.toggleSearch = function () {
        $scope.searchFunctionOff = !$scope.searchFunctionOff;
    };

    //Inspection slot//
    $scope.getSlot = function (slotNumber) {
        var slot = [];
        for (var i = 1; i <= slotNumber; i++) {
            slot.push(i);
        }
        return slot;
    };


    //formVariables
    $scope.formName = '';
    $scope.formTelephone = '';
    $scope.formPlate = '';
    $scope.formDate = new Date();
    $scope.selectedOptionTime = '';
    $scope.selectedOptionSlot = null;
    $scope.selectedOption = null;

    function resetForm() {
        $scope.formName = '';
        $scope.formTelephone = '';
        $scope.formPlate = '';
        $scope.formDate = new Date();
        $scope.selectedOptionTime = '';
        $scope.selectedOptionSlot = null;
        $scope.selectedOption = null;
    }

    $scope.toggleReservedSuccess = function () {
        $scope.reservedSuccess = !$scope.reservedSuccess;
    };
    $scope.invalidFieldFn = function (input) {
        return !input ? 'is-invalid' : '';
    };
    $scope.reserveInspectionSlot = function () {
        var selectedDate = $scope.formDate,
            todayDate = new Date(),
            threeWeeksPeriod = 1000 * 60 * 60 * 24 * 21,
            isNameFieldValid = $scope.invalidFieldFn($scope.formName),
            isTelephoneFieldValid = $scope.invalidFieldFn($scope.formTelephone),
            isDateFieldValid = $scope.invalidFieldFn($scope.formDate);

        var clientModel = {
            id: null,
            name: '',
            telephone: '',
            noPlate: '',
            inspectionDate: '',
            inspectionTime: '',
            selectedSlot: ''
        };
        var slotModel = {
            slotDate: '',
            slotTime: '',
            slotSelected: null
        };

        $scope.reservedSuccess = false;
        //can only reserve within 3 weeks
        if (selectedDate - threeWeeksPeriod > todayDate) {
            $scope.moreThanThreeWeeks = true;
            return;
        } else {
            $scope.moreThanThreeWeeks = false;
        }

        //check if invalid field exist
        if (isNameFieldValid === 'is-invalid' || isTelephoneFieldValid === 'is-invalid' || isDateFieldValid === 'is-invalid') {
            return;
        }

        clientModel.id = $scope.allClient.length + 1;
        clientModel.name = $scope.formName;
        clientModel.telephone = $scope.formTelephone;
        clientModel.noPlate = $scope.formPlate.toUpperCase();
        clientModel.inspectionDate = $scope.formDate.toLocaleDateString("en-MY");
        clientModel.inspectionTime = $scope.selectedOptionTime;
        clientModel.selectedSlot = $scope.selectedOptionSlot || $scope.selectedOption;

        slotModel.slotDate = clientModel.inspectionDate;
        slotModel.slotTime = clientModel.inspectionTime;
        slotModel.slotSelected = clientModel.selectedSlot;

        //check slot validity
        var slotValidity = $scope.checkSlotValidity(slotModel.slotSelected, slotModel.slotTime);
        if (slotValidity === 'occupiedSlot') {
            $scope.slotIsTaken = true;
            return;
        }
        else {
            $scope.slotIsTaken = false;
        }

        $scope.allClient.push(clientModel);
        $scope.allSlots.push(slotModel);
        $scope.toggleReservedSuccess();
        resetForm();
    };

    //local harcoded sample data
    $scope.inspectionSlotWeekdays = {
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        slotNumber: $scope.getSlot(36),
        singleSlotNumber: $scope.getSlot(2)
    };
    $scope.inspectionSlotWeekends = {
        day: ['Saturday'],
        slotNumber: $scope.getSlot(72),
        singleSlotNumber: $scope.getSlot(4)
    };
    $scope.inspectionTime = ['9am - 9.30am', '9.30am - 10am', '10am - 10.30am', '10.30am - 11am', '11am - 11.30am', '11.30am - 12pm',
        '12pm - 12.30pm', '12.30m - 1pm', '1pm - 1.30pm', '1.30pm - 2pm', '2pm - 2.30pm', '2.30pm - 3pm', '3pm - 3.30pm', '3.30pm - 4pm',
        '4pm - 4.30pm', '4.30pm - 5pm', '5pm - 5.30pm', '5.30pm - 6pm'];
    $scope.allClient = [
        {
            "id": 1,
            "name": "Khaidir",
            "telephone": "0167286362",
            "noPlate": "MDD5427",
            "inspectionDate": "11/04/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 2
        },
        {
            "id": 2,
            "name": "John",
            "telephone": "0140092218",
            "noPlate": "MDC1237",
            "inspectionDate": "21/05/2020",
            "inspectionTime": "11am - 11.30am",
            "selectedSlot": 2
        },
        {
            "id": 3,
            "name": "Jack",
            "telephone": "0127829393",
            "noPlate": "WAI992",
            "inspectionDate": "21/04/2020",
            "inspectionTime": "12pm - 12.30pm",
            "selectedSlot": 1
        },
        {
            "id": 4,
            "name": "Mary",
            "telephone": "0138982727",
            "noPlate": "JAU9266",
            "inspectionDate": "22/04/2020",
            "inspectionTime": "2pm - 2.30pm",
            "selectedSlot": 1
        },
        {
            "id": 5,
            "name": "Sylar",
            "telephone": "0199827829",
            "noPlate": "VIP999",
            "inspectionDate": "16/04/2020",
            "inspectionTime": "5pm - 5.30pm",
            "selectedSlot": 1
        },
        {
            "id": 6,
            "name": "Salmah",
            "telephone": "0172635627",
            "noPlate": "MCJ7892",
            "inspectionDate": "17/04/2020",
            "inspectionTime": "4pm - 4.30pm",
            "selectedSlot": 2
        },
        {
            "id": 7,
            "name": "Ah Chong",
            "telephone": "0176525263",
            "noPlate": "JAT1127",
            "inspectionDate": "02/05/2020",
            "inspectionTime": "3pm - 3.30pm",
            "selectedSlot": 4
        },
        {
            "id": 8,
            "name": "Raju",
            "telephone": "0182937322",
            "noPlate": "KED2322",
            "inspectionDate": "01/05/2020",
            "inspectionTime": "3pm - 3.30pm",
            "selectedSlot": 1
        },
        {
            "id": 9,
            "name": "Zack",
            "telephone": "0176804671",
            "noPlate": "PAU8233",
            "inspectionDate": "21/06/2020",
            "inspectionTime": "3pm - 3.30pm",
            "selectedSlot": 2
        },
        {
            "id": 10,
            "name": "Ali",
            "telephone": "0165463728",
            "noPlate": "MAR4141",
            "inspectionDate": "16/04/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 1
        },
        {
            "id": 11,
            "name": "Melur",
            "telephone": "01999288282",
            "noPlate": "MDD8222",
            "inspectionDate": "17/04/2020",
            "inspectionTime": "10.30am - 11am",
            "selectedSlot": 2
        },
        {
            "id": 12,
            "name": "Mark",
            "telephone": "0172662922",
            "noPlate": "MAS9288",
            "inspectionDate": "15/04/2020",
            "inspectionTime": "9am - 9.30am",
            "selectedSlot": 1
        },
        {
            "id": 13,
            "name": "Sassy",
            "telephone": "0166628292",
            "noPlate": "KED1110",
            "inspectionDate": "22/04/2020",
            "inspectionTime": "11.30am - 12pm",
            "selectedSlot": 2
        },
        {
            "id": 14,
            "name": "Antoinette",
            "telephone": "(957) 483-3562",
            "noPlate": "MDD5427",
            "inspectionDate": "02/05/2020",
            "inspectionTime": "9am - 9.30am",
            "selectedSlot": 1
        },
        {
            "id": 15,
            "name": "Cecilia",
            "telephone": "(972) 477-2171",
            "noPlate": "MDD5427",
            "inspectionDate": "03/05/2020",
            "inspectionTime": "9.30am - 10am",
            "selectedSlot": 1
        },
        {
            "id": 16,
            "name": "Fleming",
            "telephone": "(903) 441-2558",
            "noPlate": "MDD5427",
            "inspectionDate": "09/05/2020",
            "inspectionTime": "10.30am - 11am",
            "selectedSlot": 1
        },
        {
            "id": 17,
            "name": "Shana",
            "telephone": "(980) 402-3141",
            "noPlate": "MDD5427",
            "inspectionDate": "05/05/2020",
            "inspectionTime": "12pm - 12.30pm",
            "selectedSlot": 2
        },
        {
            "id": 18,
            "name": "Lora",
            "telephone": "(833) 540-2107",
            "noPlate": "MDD5427",
            "inspectionDate": "20/04/2020",
            "inspectionTime": "9am - 9.30am",
            "selectedSlot": 1
        },
        {
            "id": 19,
            "name": "Porter",
            "telephone": "(907) 496-2561",
            "noPlate": "MDD5427",
            "inspectionDate": "06/05/2020",
            "inspectionTime": "5pm - 5.30pm",
            "selectedSlot": 1
        },
        {
            "id": 20,
            "name": "Lawanda",
            "telephone": "(821) 400-2485",
            "noPlate": "MDD5427",
            "inspectionDate": "29/04/2020",
            "inspectionTime": "3pm - 3.30pm",
            "selectedSlot": 1
        },
        {
            "id": 21,
            "name": "Frank",
            "telephone": "(938) 452-3734",
            "noPlate": "MDD5427",
            "inspectionDate": "12/04/2020",
            "inspectionTime": "10am - 10.30am",
            "selectedSlot": 2
        },
        {
            "id": 22,
            "name": "Forbes",
            "telephone": "(861) 576-3615",
            "noPlate": "MDD5427",
            "inspectionDate": "27/04/2020",
            "inspectionTime": "5pm - 5.30pm",
            "selectedSlot": 2
        },
        {
            "id": 23,
            "name": "Chrystal",
            "telephone": "(970) 543-2334",
            "noPlate": "MDD5427",
            "inspectionDate": "22/04/2020",
            "inspectionTime": "2.30pm - 3pm",
            "selectedSlot": 2
        },
        {
            "id": 24,
            "name": "Juliet",
            "telephone": "(900) 477-2700",
            "noPlate": "MDD5427",
            "inspectionDate": "17/04/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 1
        },
        {
            "id": 25,
            "name": "Charles",
            "telephone": "(986) 417-3644",
            "noPlate": "MDD5427",
            "inspectionDate": "14/04/2020",
            "inspectionTime": "12.30m - 1pm",
            "selectedSlot": 1
        },
        {
            "id": 26,
            "name": "Whitaker",
            "telephone": "(931) 450-3682",
            "noPlate": "MDD5427",
            "inspectionDate": "20/04/2020",
            "inspectionTime": "4pm - 4.30pm",
            "selectedSlot": 2
        },
        {
            "id": 27,
            "name": "Mcleod",
            "telephone": "(959) 536-2922",
            "noPlate": "MDD5427",
            "inspectionDate": "15/04/2020",
            "inspectionTime": "2.30pm - 3pm",
            "selectedSlot": 2
        },
        {
            "id": 28,
            "name": "Kristen",
            "telephone": "(985) 483-2895",
            "noPlate": "MDD5427",
            "inspectionDate": "27/04/2020",
            "inspectionTime": "10.30am - 11am",
            "selectedSlot": 1
        },
        {
            "id": 29,
            "name": "Marietta",
            "telephone": "(850) 467-2439",
            "noPlate": "MDD5427",
            "inspectionDate": "16/04/2020",
            "inspectionTime": "11.30am - 12pm",
            "selectedSlot": 1
        },
        {
            "id": 30,
            "name": "Curtis",
            "telephone": "(950) 423-3685",
            "noPlate": "MDD5427",
            "inspectionDate": "24/04/2020",
            "inspectionTime": "2.30pm - 3pm",
            "selectedSlot": 2
        },
        {
            "id": 31,
            "name": "Marcella",
            "telephone": "(831) 455-3853",
            "noPlate": "MDD5427",
            "inspectionDate": "26/04/2020",
            "inspectionTime": "3.30pm - 4pm",
            "selectedSlot": 2
        },
        {
            "id": 32,
            "name": "Roseann",
            "telephone": "(914) 425-3698",
            "noPlate": "MDD5427",
            "inspectionDate": "01/05/2020",
            "inspectionTime": "9.30am - 10am",
            "selectedSlot": 2
        },
        {
            "id": 33,
            "name": "Millicent",
            "telephone": "(927) 435-2482",
            "noPlate": "MDD5427",
            "inspectionDate": "18/04/2020",
            "inspectionTime": "4.30pm - 5pm",
            "selectedSlot": 2
        },
        {
            "id": 34,
            "name": "Strong",
            "telephone": "(914) 468-3517",
            "noPlate": "MDD5427",
            "inspectionDate": "10/05/2020",
            "inspectionTime": "4.30pm - 5pm",
            "selectedSlot": 2
        },
        {
            "id": 35,
            "name": "Bates",
            "telephone": "(867) 568-3345",
            "noPlate": "MDD5427",
            "inspectionDate": "17/04/2020",
            "inspectionTime": "10.30am - 11am",
            "selectedSlot": 1
        },
        {
            "id": 36,
            "name": "Lea",
            "telephone": "(884) 426-3683",
            "noPlate": "MDD5427",
            "inspectionDate": "20/04/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 1
        },
        {
            "id": 37,
            "name": "Hooper",
            "telephone": "(859) 585-3361",
            "noPlate": "MDD5427",
            "inspectionDate": "05/05/2020",
            "inspectionTime": "5pm - 5.30pm",
            "selectedSlot": 1
        },
        {
            "id": 38,
            "name": "Evangeline",
            "telephone": "(847) 528-3513",
            "noPlate": "MDD5427",
            "inspectionDate": "07/05/2020",
            "inspectionTime": "12.30m - 1pm",
            "selectedSlot": 1
        },
        {
            "id": 39,
            "name": "Araceli",
            "telephone": "(906) 500-3996",
            "noPlate": "MDD5427",
            "inspectionDate": "18/04/2020",
            "inspectionTime": "4.30pm - 5pm",
            "selectedSlot": 2
        },
        {
            "id": 40,
            "name": "Rogers",
            "telephone": "(807) 403-3227",
            "noPlate": "MDD5427",
            "inspectionDate": "04/05/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 1
        },
        {
            "id": 41,
            "name": "Mcdowell",
            "telephone": "(952) 451-2011",
            "noPlate": "MDD5427",
            "inspectionDate": "19/04/2020",
            "inspectionTime": "3.30pm - 4pm",
            "selectedSlot": 2
        },
        {
            "id": 42,
            "name": "Ochoa",
            "telephone": "(822) 482-2930",
            "noPlate": "MDD5427",
            "inspectionDate": "27/04/2020",
            "inspectionTime": "10.30am - 11am",
            "selectedSlot": 2
        },
        {
            "id": 43,
            "name": "Ada",
            "telephone": "(919) 474-2531",
            "noPlate": "MDD5427",
            "inspectionDate": "05/05/2020",
            "inspectionTime": "5pm - 5.30pm",
            "selectedSlot": 2
        },
        {
            "id": 44,
            "name": "Jordan",
            "telephone": "(820) 478-2838",
            "noPlate": "MDD5427",
            "inspectionDate": "18/04/2020",
            "inspectionTime": "1pm - 1.30pm",
            "selectedSlot": 2
        },
        {
            "id": 45,
            "name": "Rosetta",
            "telephone": "(928) 427-3564",
            "noPlate": "MDD5427",
            "inspectionDate": "26/04/2020",
            "inspectionTime": "11.30am - 12pm",
            "selectedSlot": 2
        },
        {
            "id": 46,
            "name": "Mallory",
            "telephone": "(895) 548-3620",
            "noPlate": "MDD5427",
            "inspectionDate": "27/04/2020",
            "inspectionTime": "12pm - 12.30pm",
            "selectedSlot": 1
        },
        {
            "id": 47,
            "name": "Mullen",
            "telephone": "(982) 467-3456",
            "noPlate": "MDD5427",
            "inspectionDate": "07/05/2020",
            "inspectionTime": "2pm - 2.30pm",
            "selectedSlot": 1
        }
    ];
    $scope.allSlots = [
        {
            "slotDate": "11/04/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "21/05/2020",
            "slotTime": "11am - 11.30am",
            "slotSelected": 2
        },
        {
            "slotDate": "21/04/2020",
            "slotTime": "12pm - 12.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "22/04/2020",
            "slotTime": "2pm - 2.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "16/04/2020",
            "slotTime": "5pm - 5.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "17/04/2020",
            "slotTime": "4pm - 4.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "02/05/2020",
            "slotTime": "3pm - 3.30pm",
            "slotSelected": 4
        },
        {
            "slotDate": "01/05/2020",
            "slotTime": "3pm - 3.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "21/06/2020",
            "slotTime": "3pm - 3.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "16/04/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "17/04/2020",
            "slotTime": "10.30am - 11am",
            "slotSelected": 2
        },
        {
            "slotDate": "15/04/2020",
            "slotTime": "9am - 9.30am",
            "slotSelected": 1
        },
        {
            "slotDate": "22/04/2020",
            "slotTime": "11.30am - 12pm",
            "slotSelected": 2
        },
        {
            "slotDate": "02/05/2020",
            "slotTime": "9am - 9.30am",
            "slotSelected": 1
        },
        {
            "slotDate": "03/05/2020",
            "slotTime": "9.30am - 10am",
            "slotSelected": 1
        },
        {
            "slotDate": "09/05/2020",
            "slotTime": "10.30am - 11am",
            "slotSelected": 1
        },
        {
            "slotDate": "05/05/2020",
            "slotTime": "12pm - 12.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "20/04/2020",
            "slotTime": "9am - 9.30am",
            "slotSelected": 1
        },
        {
            "slotDate": "06/05/2020",
            "slotTime": "5pm - 5.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "29/04/2020",
            "slotTime": "3pm - 3.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "12/04/2020",
            "slotTime": "10am - 10.30am",
            "slotSelected": 2
        },
        {
            "slotDate": "27/04/2020",
            "slotTime": "5pm - 5.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "22/04/2020",
            "slotTime": "2.30pm - 3pm",
            "slotSelected": 2
        },
        {
            "slotDate": "17/04/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "14/04/2020",
            "slotTime": "12.30m - 1pm",
            "slotSelected": 1
        },
        {
            "slotDate": "20/04/2020",
            "slotTime": "4pm - 4.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "15/04/2020",
            "slotTime": "2.30pm - 3pm",
            "slotSelected": 2
        },
        {
            "slotDate": "27/04/2020",
            "slotTime": "10.30am - 11am",
            "slotSelected": 1
        },
        {
            "slotDate": "16/04/2020",
            "slotTime": "11.30am - 12pm",
            "slotSelected": 1
        },
        {
            "slotDate": "24/04/2020",
            "slotTime": "2.30pm - 3pm",
            "slotSelected": 2
        },
        {
            "slotDate": "26/04/2020",
            "slotTime": "3.30pm - 4pm",
            "slotSelected": 2
        },
        {
            "slotDate": "01/05/2020",
            "slotTime": "9.30am - 10am",
            "slotSelected": 2
        },
        {
            "slotDate": "18/04/2020",
            "slotTime": "4.30pm - 5pm",
            "slotSelected": 2
        },
        {
            "slotDate": "10/05/2020",
            "slotTime": "4.30pm - 5pm",
            "slotSelected": 2
        },
        {
            "slotDate": "17/04/2020",
            "slotTime": "10.30am - 11am",
            "slotSelected": 1
        },
        {
            "slotDate": "20/04/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "05/05/2020",
            "slotTime": "5pm - 5.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "07/05/2020",
            "slotTime": "12.30m - 1pm",
            "slotSelected": 1
        },
        {
            "slotDate": "18/04/2020",
            "slotTime": "4.30pm - 5pm",
            "slotSelected": 2
        },
        {
            "slotDate": "04/05/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "19/04/2020",
            "slotTime": "3.30pm - 4pm",
            "slotSelected": 2
        },
        {
            "slotDate": "27/04/2020",
            "slotTime": "10.30am - 11am",
            "slotSelected": 2
        },
        {
            "slotDate": "05/05/2020",
            "slotTime": "5pm - 5.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "18/04/2020",
            "slotTime": "1pm - 1.30pm",
            "slotSelected": 2
        },
        {
            "slotDate": "26/04/2020",
            "slotTime": "11.30am - 12pm",
            "slotSelected": 2
        },
        {
            "slotDate": "27/04/2020",
            "slotTime": "12pm - 12.30pm",
            "slotSelected": 1
        },
        {
            "slotDate": "07/05/2020",
            "slotTime": "2pm - 2.30pm",
            "slotSelected": 1
        }
    ];

    $scope.isSaturday = function (date) {
        return date ? (date.getDay() === 6) : date;
    };
    $scope.isSunday = function (date) {
        return date ? (date.getDay() === 0) : date;
    };

    var len = $scope.inspectionTime.length,
        mid = len / 2;

    $scope.leftTime = $scope.inspectionTime.slice(0, mid);
    $scope.rightTime = $scope.inspectionTime.slice(mid, len);

    //give class to all slots
    $scope.checkSlotValidity = function (slotNow, time) {
        var today = $scope.formDate.toLocaleDateString("en-MY"),
            redFlag;
        if ($scope.allSlots.map(function (e) {
                return e.slotDate;
            }).indexOf(today) > -1) {
            angular.forEach($scope.allSlots, function (slot) {
                if (slot.slotDate === today) {
                    if (slot.slotTime === time) {
                        if (slot.slotSelected === slotNow) {
                            redFlag = 'occupiedSlot';
                        }
                    }
                }
            });
            if (redFlag) {
                return redFlag;
            }
            return ($scope.formDate.getDay() !== 6 && (slotNow === 3 || slotNow === 4)) ? 'unavailableSlot' : 'availableSlot'
        } else {
            return ($scope.formDate.getDay() !== 6 && (slotNow === 3 || slotNow === 4)) ? 'unavailableSlot' : 'availableSlot'
        }
    };

    //Datepicker//
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: undefined
    };
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        minDate: new Date(),
        startingDay: 1
    };

    // Disable Sunday selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.toggleMin();
    $scope.openCalendar = function () {
        $scope.popup1.opened = true;
    };
    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['d!/M!/yyyy'];
    $scope.popup1 = {
        opened: false
    };


    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}]);
