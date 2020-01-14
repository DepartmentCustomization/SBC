DECLARE @info TABLE (Id INT, cars_name NVARCHAR(100));

BEGIN
INSERT INTO
        [dbo].[Cars] (
                [cars_name],
                [cars_number],
                [cars_mark],
                [cars_year],
                [creator_id],
                [create_date],
                [editor_id],
                [edit_date]
        ) OUTPUT inserted.Id,
        inserted.cars_name INTO @info
VALUES
        (
                @cars_name,
                @cars_number,
                @cars_mark,
                @cars_year,
                @user_id,
                getutcdate(),
                @user_id,
                getutcdate()
        );
END IF(
        SELECT
                Id
        FROM
                @info
) IS NOT NULL BEGIN
SELECT
        N'Автомобиль "' + cars_name + N'" добавлено'
FROM
        @info;
END