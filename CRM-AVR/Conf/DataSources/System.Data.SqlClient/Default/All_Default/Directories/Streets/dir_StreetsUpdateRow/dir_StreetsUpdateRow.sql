UPDATE
   [dbo].[Streets]
SET
   [Street_type_id] = @type_id,
   [Name] = @Name,
   [Old_Name] = @Old_Name,
   [Territory] = @Territory
WHERE
   Id = @Id;