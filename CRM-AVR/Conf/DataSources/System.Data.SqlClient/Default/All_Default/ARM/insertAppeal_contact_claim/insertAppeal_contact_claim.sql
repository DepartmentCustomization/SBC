 INSERT INTO [dbo].[Appeals]
           ([Claim_ID]
           ,[Contact_ID]
           ,[Date])
output [inserted].[Id]
        VALUES
           (
		    @claims_Id
           ,@contacts_Id
           ,getutcdate()
		   )