/*
DECLARE @category_id INT = 10;
DECLARE @part_name NVARCHAR(255) = N'NewTestPart';
DECLARE @manufacturer NVARCHAR(255) = N'NewTest';
DECLARE @articul NVARCHAR(100) = N'NewTestArticul';
DECLARE @user_id NVARCHAR(128) = N'29796543-b903-48a6-9399-4840f6eac396';
*/
DECLARE @info TABLE (
        Id INT,
        articul NVARCHAR(100),
        part_name NVARCHAR(255)
);

DECLARE @Uniquier BIT = (
        SELECT
                CASE
                        WHEN COUNT(Id) > 0 THEN 1
                        ELSE 0
                END
        FROM
                dbo.[Parts]
        WHERE
                part_name = @part_name
                AND articul = @articul
);

IF(@Uniquier = 0)
BEGIN 
INSERT INTO
        [dbo].[Parts] (
                [category_id],
                [part_name],
                [articul],
                [manufacturer] 
                -- ,[part_quantity]
                -- ,[part_price]
,
                [creator_id],
                [create_date],
                [editor_id],
                [edit_date]
        ) OUTPUT inserted.Id,
        inserted.articul,
        inserted.part_name INTO @info (Id, articul, part_name)
VALUES
        (
                @category_id,
                @part_name,
                @articul,
                @manufacturer 
                --    , @part_quantity
                --    , @part_price
,
                @user_id,
                getutcdate(),
                @user_id,
                getutcdate()
        );

DECLARE @newId INT = (
        SELECT
                TOP 1 Id
        FROM
                @info
);
END
ELSE IF (@Uniquier = 1)
   BEGIN
   RAISERROR(N'Ошибка! Дубликат значений по названию и артикулу', 16, 1);
   RETURN;
   END

IF(@newId) IS NOT NULL 
BEGIN
SELECT
        TOP 1 N'Запчасть "' + part_name + N'" добавлено' AS info_message,
        @newId AS Id,
        articul
FROM
        @info;

END