-- DECLARE @Id INT = 1;
-- DECLARE @type INT = 19;
-- DECLARE @district INT = 10;
-- DECLARE @street1 INT = 4829;
-- DECLARE @street2 INT = 2951;
-- DECLARE @Number NVARCHAR(20);
-- DECLARE @Letter NVARCHAR(20);
-- DECLARE @Lattitude NVARCHAR(50);
-- DECLARE @Longitude NVARCHAR(50);

IF(@type = 19)
BEGIN

DECLARE @crossName NVARCHAR(150) = 
(SELECT 
		s.[Name] + N' ' + st.AbbrU
FROM dbo.[Streets] s
INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
WHERE s.Id = @street1 ) + N'/' +
(SELECT 
		s.[Name] + N' ' + st.AbbrU
FROM dbo.[Streets] s
INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
WHERE s.Id = @street2 ) ;

DECLARE @crossInfo TABLE (Id INT);

INSERT INTO dbo.[CrossSTR] ([Name],
							[Streets_1_ID],
							[Streets_2_ID])
	OUTPUT inserted.Id INTO @crossInfo(Id)
	VALUES(@crossName,
		   @street1,
		   @street2 ) ;

DECLARE @newCrossID INT = (SELECT TOP 1 Id FROM @crossInfo);
DECLARE @placeInfo TABLE (Id INT);

INSERT INTO dbo.[Places] ([Place_type_ID],
						  [District_ID],
						  [Name],
						  [Lattitude],
						  [Longitude],
						  [Cross_id])
	OUTPUT inserted.Id INTO @placeInfo(Id)
	VALUES(@type,
		   @district,
		   @crossName,
		   @Lattitude,
		   @Longitude,
		   @newCrossID) ;

DECLARE @newPlaceID INT = (SELECT TOP 1 Id FROM @placeInfo);

DECLARE @entity NVARCHAR(20) = (SELECT [object] FROM dbo.[T_Places] WHERE Id = @Id);
--IF(@entity = N'Claim')