import { user } from './currentUser';
import { dictionaryCategory } from './dictionaryCategory';
import { BehaviorWithStore } from 'mobx-miniprogram-bindings';

export const userBehavior = BehaviorWithStore({
    storeBindings: [
        {
            namespace: 'user',
            store: user,
            fields: ['data', 'loading'],
            actions: ['getUser'],
        },
        {
            namespace: 'dictionaryCategory',
            store: dictionaryCategory,
            fields: ['data', 'loading'],
            actions: ['getDictionaryCategory'],
        },
    ],
});
