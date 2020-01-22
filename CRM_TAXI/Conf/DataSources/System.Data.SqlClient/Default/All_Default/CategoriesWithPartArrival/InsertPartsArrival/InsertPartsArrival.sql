DECLARE @info TABLE (Id INT, invoice_number NVARCHAR(100));

BEGIN
INSERT INTO
    [dbo].[PartArrival] (
        [part_id],
        [provider_id],
        [invoice_number],
        [part_quantity],
        [part_price],
        [creator_id],
        [create_date],
        [editor_id],
        [edit_date]
    ) Output inserted.Id,
    inserted.invoice_number INTO @info
VALUES
    (
        @articul,
        @provider,
        @invoice_number,
        @part_quantity,
        @part_price,
        @user_id,
        getutcdate(),
        @user_id,
        getutcdate()
    );
END 
IF(SELECT Id FROM @info) IS NOT NULL 
    BEGIN
SELECT
    N'Приход запчастей по накладной "' + invoice_number + N'" выполнен',
    Id
FROM
    @info;
END