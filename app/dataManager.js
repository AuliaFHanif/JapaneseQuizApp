const dataManager = (function() {
    const CHUNK_NAMES = [
        "N5_nouns", "N5_verbs", "N5_adjectives",
        "N4_nouns", "N4_adjectives", "N4_verbs",
        "N3_nouns", "N3_verbs", "N3_adjectives",
        "N2_nouns", "N2_verbs", "N2_adjectives",
        "N1_nouns", "N1_verbs", "N1_adjectives"
    ];

    const loadedChunks = new Set();
    const loadingPromises = {};

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function loadChunk(chunkName) {
        if (loadedChunks.has(chunkName)) {
            return window[`questionData_${chunkName}`];
        }
        
        if (loadingPromises[chunkName]) {
            return loadingPromises[chunkName];
        }

        loadingPromises[chunkName] = loadScript(`data/questionData_${chunkName}.js`)
            .then(() => {
                loadedChunks.add(chunkName);
                const data = window[`questionData_${chunkName}`];
                return data;
            });

        return loadingPromises[chunkName];
    }

    async function loadAllQuestionData() {
        const promises = CHUNK_NAMES.map(chunk => loadChunk(chunk));
        const allDataArrays = await Promise.all(promises);
        window.questionData = allDataArrays.flat();
        return window.questionData;
    }

    async function loadQuestionDataByLevel(level) {
        const targetChunks = CHUNK_NAMES.filter(chunk => chunk.startsWith(level + "_"));
        const promises = targetChunks.map(chunk => loadChunk(chunk));
        const allDataArrays = await Promise.all(promises);
        
        // Many scripts expect a global `questionData` variable to filter from
        window.questionData = allDataArrays.flat();
        return window.questionData;
    }

    return {
        loadAllQuestionData,
        loadQuestionDataByLevel,
        CHUNK_NAMES
    };
})();
