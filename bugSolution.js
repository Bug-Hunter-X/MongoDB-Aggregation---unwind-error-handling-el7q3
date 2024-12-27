```javascript
//Corrected aggregation pipeline with error handling
aggregate([
    {
       $lookup: {
           from: "collectionB",
           localField: "_id",
           foreignField: "foreignKey",
           as: "relatedDocs"
       }
    },
    {
       $match: {
           "relatedDocs": { $ne: [] }
       }
    },
    {
       $unwind: "$relatedDocs"
    }
])

//Alternative solution without $unwind
aggregate([
  {
    $lookup: {
      from: 'collectionB',
      let: { id: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$foreignKey', '$$id'] }
          }
        }
      ],
      as: 'relatedDocs'
    }
  },
  {
    $unwind: { path: '$relatedDocs', preserveNullAndEmptyArrays: true }
  }
]);
```