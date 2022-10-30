SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uwInner.state, uwInner.id AS userWordID, uwInner.userID, w.audioFile 
FROM words w 
LEFT JOIN ( 
  SELECT * 
  FROM userWords 
  WHERE userID = {userId} 
) uwInner ON uwInner.wordID = w.id 
WHERE w.id NOT IN ( 
  SELECT uw.wordID 
  FROM userWords uw 
  WHERE uw.userID = {userId} AND ( 
    uw.state > 5 OR ( 
      (uw.state = 2 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -4 DAY)) OR 
      (uw.state = 3 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -7 DAY)) OR 
      (uw.state = 4 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -15 DAY)) OR 
      (uw.state = 5 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -30 DAY)) 
    ) 
  ) 
) AND (NOT ISNULL(uwInner.userID) OR (ISNULL(uwInner.userID) AND w.levelID <> 7)) 
ORDER BY uwInner.state DESC, w.levelID ASC 
LIMIT {limit};