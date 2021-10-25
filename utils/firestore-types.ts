import { SnapshotListenOptions, DocumentData, QuerySnapshot, FirestoreError } from "@firebase/firestore";

type LoadingHook<T, E> = [T | undefined, boolean, E | undefined];
type GetOptions = {
   source: 'default' | 'server' | 'cache';
};

export type Options = {
   snapshotListenOptions?: SnapshotListenOptions;
};

export type OnceOptions = {
   getOptions?: GetOptions
};

export type CollectionHook<T = DocumentData> = LoadingHook<
   QuerySnapshot<T>,
   FirestoreError
>;