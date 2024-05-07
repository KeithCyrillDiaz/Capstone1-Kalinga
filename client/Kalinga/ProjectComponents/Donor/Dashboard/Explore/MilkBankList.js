const getMilkBankList = () => {
    return [
        {
            id: 1,
            name: 'QCGH - Human Milk Bank',
            latitude: 14.662564036782621,
            longitude: 121.0179085746319,
            description: "Human Milk Bank",
            address: "M269+H7J General Hospital, Project 8, Quezon City, Metro Manila",
            contactNum: "8863-0800 local 209",
            fb: "facebook.com/QC.HUMANMILKBANK",
            fblink: "https://www.facebook.com/QC.HUMANMILKBANK",
            image: require('../../../../assets/milkbanks/qcgh.jpg')
        },
        {
            id: 2,
            name: 'UP PGH - Human Milk Bank',
            latitude: 14.577864949694556,
            longitude: 120.98562979591463,
            description: "Human Milk Bank",
            address: "HXHP+469, Taft Ave, Ermita, Manila, 1000 Metro Manila",
            contactNum: "+63 2 554 8400 ext. HMB",
            fb: "facebook.com/Up-Pgh-HUMAN-Milkbank",
            fblink: "https://www.facebook.com/p/Up-Pgh-HUMAN-Milkbank-100066622962296/",
            image: require('../../../../assets/milkbanks/pgh.jpg')
        },
        {
            id: 3,
            name: 'Bagong Ospital ng Maynila',
            latitude: 14.564645951335832,
            longitude: 120.986958910045,
            description: "Human Milk Bank",
            address: "719 Quirino Avenue, corner A. Mabini St, Malate, Manila, 1004 Metro Manila",
            contactNum: "(02) 85246061",
            fb: "facebook.com/ommcofficial",
            fblink: "https://www.facebook.com/ommcofficial",
            image: require('../../../../assets/milkbanks/ommc.jpg')
        },
    ];
};

export default getMilkBankList;
