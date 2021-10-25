import { useEffect, useMemo } from 'react';
import { getDocs, onSnapshot, Query, DocumentData, QuerySnapshot, FirestoreError } from 'firebase/firestore';
import { Options, OnceOptions, CollectionHook } from './firestore-types';
import useFirestoreLoadingValue from './useFirestoreLoadingValue';
import { useIsEqualRef } from './refHooks';

/**
 * Custom hook to return a collection given a query and options for listening
 * to changes to the data
 * @param q 
 */
export const useFirestoreCollection = <T = DocumentData>(
   query?: Query | null,
   options?: Options
): CollectionHook<T> => {
   return useFirestoreCollectionInternal(true, query, options);
};

export const useFirestoreCollectionOnce = <T = DocumentData>(
   query?: Query | null,
   options?: Options
): CollectionHook<T> => {
   return useFirestoreCollectionInternal(false, query, options);
};

export const useFirestoreCollectionInternal = <T = DocumentData>(
   listen?: boolean,
   query?: Query | null,
   options?: Options & OnceOptions
) => {
   const { error, loading, reset, setError, setValue, value } = useFirestoreLoadingValue<QuerySnapshot, FirestoreError>();
   const ref = useIsEqualRef(query, reset);

   useEffect(() => {
      if (!ref.current) {
         setValue(undefined);
         return;
      }
      if (listen) {
         const listener = options && options.snapshotListenOptions ?
            onSnapshot(ref.current, options.snapshotListenOptions, setValue, setError) :
            onSnapshot(ref.current, setValue, setError);
         
         return () => {
            listener();
         }
      } else {
         const querySnapshot = getDocs(ref.current).then(setValue).catch(setError);
      }
   }, [ref.current]);

   const resArray: CollectionHook<T> = [
      value as QuerySnapshot<T>,
      loading,
      error,
   ];
   return useMemo(() => resArray, resArray);
}