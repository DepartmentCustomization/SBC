-- DECLARE @Description NVARCHAR(255);
-- DECLARE @claimTypeID INT = 11;
-- DECLARE @typeAccessID INT = 1;

DECLARE @info TABLE (Id INT NOT NULL);

INSERT INTO [dbo].[Response]
           ([Description]
           ,[Claim_type]
           ,[TypeAccess_ID])
OUTPUT inserted.Id INTO @info(Id)
     VALUES
           (@Description
           ,@claimTypeID
           ,@typeAccessID) ;

SELECT 
TOP 1 Id 
FROM @info;