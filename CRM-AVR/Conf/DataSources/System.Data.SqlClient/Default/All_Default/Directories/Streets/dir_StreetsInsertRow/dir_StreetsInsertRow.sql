DECLARE @out_street TABLE (Id INT);
DECLARE @out_house TABLE (Id INT);
DECLARE @new_street_id INT;

INSERT INTO
      [dbo].[Streets] (
            [Name],
            [Street_type_id],
            [Old_name],
            [Territory]
      ) output [inserted].[Id] INTO @out_street (Id)
VALUES
      (
            @Name,
            @type_id,
            @Old_name,
            IIF(LEN(rtrim(@Territory)) > 0, @Territory, NULL)
      );
 
SELECT
      TOP 1 @new_street_id = Id
FROM
      @out_street;

/*
 для того что-бы новую улицу можно было выбрать в модалке списка мест по чудо-логике 
 ее необходимо внести в Houses, затем House.Id привязать как Streets.Street_Id ..
 */
INSERT INTO
      dbo.Houses (Street_id, [Name], [Number], [Is_Active]) output inserted.Id INTO @out_house(Id)
VALUES
      (@new_street_id, @Name, N'sys', 1);

UPDATE
      dbo.Streets
SET
      Street_Id = (
            SELECT
                  TOP 1 Id
            FROM
                  @out_house
      )
WHERE
      Id = @new_street_id;

      SELECT @new_street_id AS Id;
      RETURN; 