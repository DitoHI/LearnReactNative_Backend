import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import { Types } from 'mongoose';

import listingType from '../../types/listing';
import ListingModel from '../../../models/listing';

export default {
    type: listingType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, options) {
        return ListingModel
            .findById(params._id)
            .exec();
    }
};