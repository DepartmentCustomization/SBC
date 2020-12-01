UPDATE
   [dbo].[Streets]
SET
   [Street_type_id] = @type_id,
   [Name] = @Name,
   [Old_name] = @Old_name,
   [Territory] = @Territory
WHERE
   Id = @Id;