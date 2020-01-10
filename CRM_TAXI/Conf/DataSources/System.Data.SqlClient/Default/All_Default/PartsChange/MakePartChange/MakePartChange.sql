---- QUERY HEADER FOR TSQL LINTER----
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET ANSI_NULLS ON;
SET NOCOUNT ON;
SET QUOTED_IDENTIFIER OFF;
---- END HEADER ----

-- DECLARE @prev_part_id INT = 6;
-- DECLARE @part_id INT;- DECLARE @cars_id INT = 1;
-- DECLARE @invoice_consumption NVARCHAR(100);
-- DECLARE @user_id NVARCHAR(128) = (SELECT TOP 1 UserId FROM CRM_TAXI_System.dbo.[User]);

DECLARE @info TABLE (Id INT, part_id INT, car_id INT );
DECLARE @is_install_first BIT;
DECLARE @car_maxday_run DATETIME = (SELECT MAX(create_date) FROM dbo.RunCar WHERE car_id = @cars_id);
DECLARE @part_price FLOAT(25) = (SELECT part_price FROM dbo.Parts WHERE Id = @part_id);
DECLARE @run_km_install_day INT = (SELECT isnull(run_km,0) FROM dbo.RunCar
                                   WHERE car_id = @cars_id AND create_date = @car_maxday_run);
BEGIN
INSERT INTO [dbo].[PartChange]
           ([part_id]
           ,[cars_id]
           ,[part_price]
           ,[install_date]
           ,[run_km_install_day]
           ,[invoice_consumption]
           ,[is_install_first]
           ,[remove_operation_id]
           ,[creator_id]
           ,[create_date]
           ,[editor_id]
           ,[edit_date])
	OUTPUT inserted.Id, inserted.part_id, inserted.cars_id INTO @info
    VALUES(
	        @part_id
           ,@cars_id
           ,@part_price
           ,getutcdate()
           ,@run_km_install_day
           ,@invoice_consumption
           ,IIF(@prev_part_id IS NULL, 1, 0)
           ,NULL
           ,@user_id
           ,getutcdate()
           ,@user_id
           ,getutcdate()
		   );

		IF(@prev_part_id IS NOT NULL)
		BEGIN
		UPDATE dbo.PartChange 
		SET remove_operation_id = (SELECT TOP 1 Id FROM @info)
		WHERE cars_id = @cars_id 
		AND part_id = @prev_part_id
		AND remove_operation_id IS NULL
        AND Id < (SELECT TOP 1 Id FROM @info);
		END		
END
---- Данные сколько детали положено было служить в днях и км от категории ----
    DECLARE @category INT = (SELECT category_id FROM dbo.Parts WHERE Id = @part_id);
	DECLARE @new_changeId INT = (SELECT TOP 1 Id FROM @info);

    DECLARE @category_period_day INT = (
	SELECT operational_period_day
	FROM dbo.Categories WHERE Id = @category);

    DECLARE @category_period_km INT = (
	SELECT operational_period_km
	FROM dbo.Categories WHERE Id = @category);
---- Если текущая деталь снимается вместо прошлой (а не 1 установка) то подсчитать, прошла ли период эксплуатации ----
	IF(SELECT Id FROM dbo.PartChange WHERE remove_operation_id = @new_changeId) IS NOT NULL
	BEGIN
		DECLARE @exploration_km INT = (
		SELECT pc2.run_km_install_day - pc1.run_km_install_day
		FROM dbo.PartChange pc1
		INNER JOIN dbo.PartChange pc2 ON pc1.remove_operation_id = pc2.Id  
		WHERE pc1.cars_id = @cars_id
		);

	    DECLARE @exploration_day INT = (
		SELECT datediff(day, pc1.install_date, pc2.install_date)
		FROM dbo.PartChange pc1
		INNER JOIN dbo.PartChange pc2 ON pc1.remove_operation_id = pc2.Id  
		WHERE pc1.cars_id = @cars_id
		);

		DECLARE @is_exploration_km_passed BIT = (
		SELECT CASE WHEN @exploration_km >= @category_period_km
		THEN 1 ELSE 0 END );

		DECLARE @is_exploration_day_passed BIT = (
		SELECT CASE WHEN @exploration_day >= @category_period_day
		THEN 1 ELSE 0 END );

	END
---- Выдать конечную информацию в ответ, если все прошло норм ----
	IF(SELECT Id FROM @info) IS NOT NULL
    BEGIN
        UPDATE dbo.Parts
		SET part_quantity -=1
		WHERE Id = @part_id;
		---- Если запчасть прошла эксплуатационный период в днях и киллометрах ----
		IF(@is_exploration_day_passed = 1 AND @is_exploration_km_passed = 1)
		BEGIN
    SELECT
	N'Запчасть "' + p.part_name + N'" установлено в машину "' + CAST(c.cars_name AS NVARCHAR(25)) + N'"'
	AS result, NULL AS resultNotify
    FROM @info i
	INNER JOIN dbo.Parts p ON p.Id = i.part_id
	INNER JOIN dbo.Cars c ON c.Id = i.car_id ;
	   END
	   ---- Если запчасть не прошла эксплуатационный период в днях и киллометрах ----
	  ELSE IF(@is_exploration_day_passed = 0 AND @is_exploration_km_passed = 0)
		BEGIN
    SELECT 
	N'Запчасть "' + p.part_name + N'" установлено в машину "' + CAST(c.cars_name AS NVARCHAR(25)) + N'"' 
	AS result,
	N'Эксплуатационный период запчасти не пройден по дням и км.' + CHAR(13) +
	N' Запчасть: "' + p.part_name + N'".' + CHAR(13) + 
	N' Позывной: "' + CAST(c.cars_name AS NVARCHAR(25)) + N'".' AS resultNotify
    FROM @info i
	INNER JOIN dbo.Parts p ON p.Id = i.part_id
	INNER JOIN dbo.Cars c ON c.Id = i.car_id ;
	   END
	   ---- Если запчасть прошла эксплуатационный период в днях и не прошла в киллометрах ----
	  ELSE IF(@is_exploration_day_passed = 1 AND @is_exploration_km_passed = 0)
		BEGIN
    SELECT
	N'Запчасть "' + p.part_name + N'" установлено в машину "' + CAST(c.cars_name AS NVARCHAR(25)) + N'"'
	AS result,
	N'Эксплуатационный период запчасти пройден по дням НО не пройден в км.' + CHAR(13) +
	N' Запчасть: "' + p.part_name + N'".' + CHAR(13) + 
	N' Позывной: "' + CAST(c.cars_name AS NVARCHAR(25)) + N'".' AS resultNotify
    FROM @info i
	INNER JOIN dbo.Parts p ON p.Id = i.part_id
	INNER JOIN dbo.Cars c ON c.Id = i.car_id ;
	   END
	   ---- Если запчасть прошла эксплуатационный период в км и не прошла в днях ----
	  ELSE IF(@is_exploration_day_passed = 0 AND @is_exploration_km_passed = 1)
		BEGIN
    SELECT 
	N'Запчасть "' + p.part_name + N'" установлено в машину "' + CAST(c.cars_name AS NVARCHAR(25)) + N'"' 
	AS result,
	N'Эксплуатационный период запчасти пройден по км НО не пройден в днях.' + CHAR(13) +
	N' Запчасть: "' + p.part_name + N'".' + CHAR(13) + 
	N' Позывной: "' + CAST(c.cars_name AS NVARCHAR(25)) + N'".' AS resultNotify
    FROM @info i
	INNER JOIN dbo.Parts p ON p.Id = i.part_id
	INNER JOIN dbo.Cars c ON c.Id = i.car_id ;
	   END

    END