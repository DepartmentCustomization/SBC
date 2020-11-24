INSERT INTO
      [dbo].[Streets] (
            [Name],
            [Street_type_id],
            [Old_name],
            [Territory]
      ) output [inserted].[Id]
VALUES
      (
            @Name,
            @type_id,
            @Old_name,
            @Territory
      );