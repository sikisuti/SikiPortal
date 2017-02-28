alter table `LearnWords`.`userWords`
modify column `lastLearned` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;