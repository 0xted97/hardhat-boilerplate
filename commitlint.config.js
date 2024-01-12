module.exports = { 
    extends: ['@commitlint/config-conventional'],
    rules: {
        BIC_RULE: [2, 'always'],
        'subject-case': [
            2,
            'always',
            ['sentence-case', 'start-case', 'pascal-case', 'upper-case', 'lower-case'],
        ],
        'scope-enum': [1, 'always'],
        "type-enum": [
            2,
            "always",
            ["build", "ci", "docs", "feat", "fix", "refactor", "perf", "test", "style"]
        ]
    },
    plugins: [
        {
            rules: {
                BIC_RULE: (input) => {
                    const {type, subject} = input;
                    if (['build', 'style', 'docs'].includes(type)) {
                        return [true, ''];
                    }
                    return [
                        /^(BEIN-\d+)\s(.+)$/.test(subject),
                        `Commit message must include a bic task id and description: "<bein_task_id> <description>". Example: BEIN-123 Update README file`,
                    ];
                },
                'scope-enum': ({scope}) => {
                    return [
                        !!scope,
                        `Scope should not empty. Because it describes the area or component of the codebase that is affected by the changes made in a particular commit`,
                    ];
                },
            },
        },
    ],
}
