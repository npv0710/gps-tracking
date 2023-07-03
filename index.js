onst VideoRefList=await Video_Ref.findAll({
    include : [
        {
            model: Complaint,
            required: true,
            attributes: [],
            include: [
                {
                    model: Accept,
                    required: true,
                    attributes: [],
                    include : [
                        {
                            model: Vehicle,
                            required: true,
                            attributes: [],
                            where: {
                                vehicleNumber:'BG1234',
                                createdAt: {
                                    [Op.gte]: moment().subtract(7, 'days').toDate()
                                }
                            },
                        }
                    ]
                }
            ]
        }
    ],
        attributes: [
            'id',
            'reference'
        ]

});