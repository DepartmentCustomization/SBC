if ( select Status_ID from Claims where Id = (select Claim_ID from Actions where Id = @action_id) ) <> 5
BEGIN

	delete from File_Doc_Action where Doc_Action_Id = (select Id from Action_Documents where Actions_Id = @action_id )
	delete from Action_Documents where Actions_Id = @action_id

	delete from Action_Materials where Action_ID = @action_id
	delete from Moves where Action_ID = @action_id

	DELETE FROM Actions WHERE Id = @action_id
END