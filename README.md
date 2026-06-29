# Japanese Kanji Quiz App

A comprehensive, minimalist, web-based Japanese Kanji reading and meaning quiz application. Designed to help learners of all levels practice their Kanji skills, ranging from complete beginners (JLPT N5) to advanced learners (JLPT N1).

---

## Key Features

### Complete JLPT Coverage
Practice Kanji vocabulary across all Japanese Language Proficiency Test (JLPT) levels:
- **N5**: Beginner basics.
- **N4**: Elementary kanji and vocabulary.
- **N3**: Intermediate kanji.
- **N2**: Upper-intermediate to advanced.
- **N1**: Advanced proficiency.

### Highly Customizable Quizzes
Tailor each session to your exact study needs:
- **Difficulty Settings**: Choose between *Easy*, *Medium*, or *Hard*. The application intelligently aggregates the vocabulary available for your selected JLPT level and displays the exact number of words available for each difficulty.
- **Quiz Length**: Practice in short bursts or take a full test by choosing 10, 20, 50, or 100 questions per session.
- **Word Categories (Parts of Speech)**: Focus your studies by filtering questions to only include *Verbs*, *Nouns*, or *Adjectives*.
- **Multiple Quiz Modes**:
  - **Reading Mode**: Focus purely on your ability to read the Kanji.
  - **Reading + Meaning Mode**: Test both your reading comprehension and your understanding of the English meaning simultaneously.

### Comprehensive Dictionary & Reference
More than just a quiz app, this includes built-in reference tools:
- **Dictionary Page**: Search and browse the entire vocabulary database.
- **Word Detail & Kanji Detail Pages**: Dive deep into specific words and individual Kanji characters to understand their details, readings (Onyomi/Kunyomi), and meanings.

### Progress Tracking
- **Stats Dashboard**: Keep track of your learning journey. The app monitors your quiz history, calculating accuracy and identifying areas for improvement over time.

### Minimalist UI/UX
- **Sepia Theme**: A beautifully designed, eye-friendly sepia and warm-toned interface that reduces eye strain during long study sessions.
- **Responsive Design**: Built to work flawlessly across devices, adapting seamlessly to desktop and mobile screens.
- **Smooth Animations**: Subtle micro-interactions and transitions (like soft fade-ins) create a premium, modern feel.

---

## Project Structure

```text
JapaneseQuizApp/
├── index.html            # Main entry point / Home screen for quiz configuration
├── README.md             # Project documentation
├── scripts/
│   └── chunk_database.js # ETL Node.js script to split lexicon arrays
└── app/
    ├── dictionary.html   # Vocabulary dictionary and search
    ├── kanjidetail.html  # Detailed view for individual Kanji characters
    ├── worddetail.html   # Detailed view for vocabulary words
    ├── quiz.html         # Quiz interface for Reading mode
    ├── quiz-meaning.html # Quiz interface for Reading + Meaning mode
    ├── stats.html        # User statistics and progress tracking
    ├── dataManager.js    # Handles asynchronous, chunked fetching of data modules
    ├── data/             # Dynamically loaded data chunks (split by level and category)
    ├── KanjiBank.js      # Main dataset for individual Kanji details
    └── KanjiBank.txt     # Raw text format of the Kanji bank
```

---

## Technologies Used

- **HTML5**: Semantic markup for the application structure.
- **CSS3**: Vanilla CSS utilizing CSS Variables for the sepia theming, Flexbox for layouts, and custom animations.
- **JavaScript (Vanilla JS)**: All quiz logic, state management, and DOM manipulation are handled with pure JavaScript. No external frameworks are used, keeping the app lightweight and lightning-fast.

---

## How It Works

- **Data Management**: The app uses split, dynamically fetched Javascript chunks (inside `app/data/`) to load thousands of vocabulary words efficiently. `dataManager.js` handles loading only the required chunks via script injection to preserve memory and UI performance while maintaining local file system compatibility.
- **State passing**: Quiz configurations from `index.html` are passed to the quiz pages (`quiz.html` or `quiz-meaning.html`) via URL parameters (GET request).
- **Local Storage**: Your quiz statistics and progress are saved using the browser's `localStorage` API, allowing your data to persist between sessions without needing a backend server.
