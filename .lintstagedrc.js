module.exports = {
    "src/**/!(*.css|*.svg|*.ico)": [
        "eslint --ext .ts,.tsx --fix",
        "prettier --ignore-unknown --write"
    ]
}
