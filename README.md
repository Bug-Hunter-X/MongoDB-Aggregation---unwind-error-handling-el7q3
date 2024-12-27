# MongoDB Aggregation: $unwind Error Handling
This repository demonstrates a common error in MongoDB aggregation pipelines involving the `$unwind` operator. The error occurs when the `$unwind` stage is used without properly handling cases where the array to unwind is empty. This can lead to unexpected results or application crashes.

## Problem
The provided code uses a `$lookup` stage to join two collections. The subsequent `$unwind` stage assumes that at least one matching document will be found. If no documents are matched, the `$unwind` stage will throw an error and the entire aggregation will fail. 

## Solution
The solution involves adding a `$match` stage after the `$lookup` stage to filter out documents where the `relatedDocs` array is empty. This ensures that the `$unwind` stage only operates on documents with at least one related document, preventing errors. Alternatively, `$unwind` can be replaced with `$lookup`'s `let` and other aggregate features to handle this without `$unwind` completely.