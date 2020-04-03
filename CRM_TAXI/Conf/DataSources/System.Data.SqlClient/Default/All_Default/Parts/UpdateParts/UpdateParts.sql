DECLARE @info TABLE (Id INT, part_name NVARCHAR(100));

DECLARE @cat_id INT = (
   SELECT
      Id
   FROM
      Categories
   WHERE
      category_name = @category_id
)
UPDATE
   [dbo].[Parts]
SET
   [category_id] = @cat_id,
   [part_name] = @part_name,
   [articul] = @articul,
   [manufacturer] = @manufacturer,
   [editor_id] = @user_id,
   [edit_date] = getutcdate() 
OUTPUT inserted.Id, inserted.part_name INTO @info
WHERE
   Id = @Id;
   
   IF(SELECT Id FROM @info) IS NOT NULL 
   BEGIN
SELECT
   'Приход запчастей по накладной "' + part_name + '" обновлен'
FROM
   @info
END