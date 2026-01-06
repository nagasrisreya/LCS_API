

function findLCS(str1, str2) {
    if (!str1 || !str2) {
        return {
            lcs: '',
            length: 0,
            position1: -1,
            position2: -1
        };
    }

    const m = str1.length;
    const n = str2.length;

    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    let maxLength = 0;
    let endIndex1 = -1;
    let endIndex2 = -1;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex1 = i - 1;
                    endIndex2 = j - 1;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    let lcs = '';
    if (maxLength > 0) {
        lcs = str1.substring(endIndex1 - maxLength + 1, endIndex1 + 1);
    }

    return {
        lcs: lcs,
        length: maxLength,
        position1: endIndex1 - maxLength + 1,
        position2: endIndex2 - maxLength + 1
    };
}

function findAllCommonSubstrings(str1, str2, minLength = 1) {
    if (!str1 || !str2) {
        return [];
    }

    const result = [];
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] >= minLength) {
                    const substring = str1.substring(i - dp[i][j], i);
                    if (!result.includes(substring)) {
                        result.push(substring);
                    }
                }
            }
        }
    }

    return result.sort((a, b) => b.length - a.length || a.localeCompare(b));
}

module.exports = {
    findLCS,
    findAllCommonSubstrings
};

