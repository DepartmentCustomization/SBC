DECLARE @info TABLE (Id INT, cars_name NVARCHAR(100));

UPDATE
   [dbo].[Cars]
SET
   [cars_name] = @cars_name,
   [cars_number] = @cars_number,
   [cars_mark] = @cars_mark,
   [cars_year] = @cars_year,
   [editor_id] = @user_id,
   [edit_date] = getutcdate() OUTPUT inserted.Id,
   inserted.cars_name INTO @info
WHERE
   Id = @Id;
IF(
      SELECT
         Id
      FROM
         @info
   ) IS NOT NULL
BEGIN
	SELECT
	   N'Данные автомобиля "' + cars_name + N'" обновлены'
	FROM
	   @info;
END