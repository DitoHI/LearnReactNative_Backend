import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import mutations from './mutations';

export default new GraphQLSchema({
    mutations: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});