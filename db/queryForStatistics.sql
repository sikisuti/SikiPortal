SELECT state, count(*) AS count, count(*) AS learnable FROM userwords WHERE userID = {userId} AND state = 1 GROUP BY state
UNION
SELECT state, count(*) AS count, count(CASE WHEN lastLearned <= DATE_ADD(CURDATE(), INTERVAL -4 DAY) THEN 1 END) AS learnable FROM userwords WHERE userID = {userId} AND state = 2 GROUP BY state
UNION
SELECT state, count(*) AS count, count(CASE WHEN lastLearned <= DATE_ADD(CURDATE(), INTERVAL -7 DAY) THEN 1 END) AS learnable FROM userwords WHERE userID = {userId} AND state = 3 GROUP BY state
UNION
SELECT state, count(*) AS count, count(CASE WHEN lastLearned <= DATE_ADD(CURDATE(), INTERVAL -15 DAY) THEN 1 END) AS learnable FROM userwords WHERE userID = {userId} AND state = 4 GROUP BY state
UNION
SELECT state, count(*) AS count, count(CASE WHEN lastLearned <= DATE_ADD(CURDATE(), INTERVAL -30 DAY) THEN 1 END) AS learnable FROM userwords WHERE userID = {userId} AND state = 5 GROUP BY state;