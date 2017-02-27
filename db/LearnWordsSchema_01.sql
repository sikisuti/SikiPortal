alter table `LearnWords`.`words`
change column `hasAudio` `audioFile` varchar(100);

alter table `LearnWords`.`words`
add column `definition` varchar(100);

alter table `LearnWords`.`words`
drop foreign key `words_ibfk_2`;

drop table `LearnWords`.`parts`;

alter table `LearnWords`.`words`
change column `partID` `lexicalCategory` varchar(50);