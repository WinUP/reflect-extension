(function () {
    enum PathObserveType {
        /**
         * Skip observe this path
         */
        Exclude,
        /**
         * Deep observe this path recursively
         */
        Deep,
        /**
         * Shallow observe this path
         */
        Shallow
    }
    (Reflect as any).PathObserveType = PathObserveType;
})();
