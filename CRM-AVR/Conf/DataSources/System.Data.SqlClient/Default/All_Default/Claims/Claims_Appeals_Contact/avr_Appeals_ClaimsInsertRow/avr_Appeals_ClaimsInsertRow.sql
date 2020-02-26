 INSERT INTO [dbo].[Appeals]
           ([Claim_ID]
           ,[Contact_ID]
           ,[Date])
output [inserted].[Id]
     VALUES
           (
		    @claims_id
           ,@contacts_Id
           ,getutcdate()
		   )