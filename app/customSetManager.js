// Shared manager for user-built "custom sets" of words.
// Custom sets are stored separately from SRS data (kanji_srs_data) and
// practicing them is intentionally NOT recorded into SRS stats.
const customSetManager = (function () {
    const STORAGE_KEY = 'kanji_custom_sets';

    function getAllSets() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveAllSets(sets) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
    }

    function generateId() {
        return 'set_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    }

    function createSet(name) {
        const sets = getAllSets();
        const newSet = {
            id: generateId(),
            name: (name || 'Untitled Set').trim() || 'Untitled Set',
            words: [],
            createdAt: new Date().toISOString()
        };
        sets.push(newSet);
        saveAllSets(sets);
        return newSet;
    }

    function deleteSet(id) {
        const sets = getAllSets().filter(s => s.id !== id);
        saveAllSets(sets);
    }

    function getSet(id) {
        return getAllSets().find(s => s.id === id) || null;
    }

    function renameSet(id, newName) {
        const sets = getAllSets();
        const set = sets.find(s => s.id === id);
        if (!set) return false;
        set.name = (newName || '').trim() || set.name;
        saveAllSets(sets);
        return true;
    }

    function addWordToSet(id, word) {
        const sets = getAllSets();
        const set = sets.find(s => s.id === id);
        if (!set) return false;
        if (!set.words.includes(word)) {
            set.words.push(word);
            saveAllSets(sets);
        }
        return true;
    }

    function removeWordFromSet(id, word) {
        const sets = getAllSets();
        const set = sets.find(s => s.id === id);
        if (!set) return false;
        set.words = set.words.filter(w => w !== word);
        saveAllSets(sets);
        return true;
    }

    return {
        STORAGE_KEY,
        getAllSets,
        saveAllSets,
        createSet,
        deleteSet,
        getSet,
        renameSet,
        addWordToSet,
        removeWordFromSet
    };
})();