DECLARE @output TABLE ([Id] INT);
DECLARE @ord_table TABLE (Id INT);
DECLARE @Claim_Number INT;
DECLARE @ord_id INT;

INSERT INTO
      [dbo].[Claims] (
            [First_claim_type_ID],
            [Claim_type_ID],
            [First_description],
            [Description],
            [Status_ID],
            [Response_organization_ID],
            [Created_at],
            [Plan_start_date],
            [Plan_finish_at],
            [Priority],
            [Report_action_id],
            [Fact_finish_at],
            [Diameters_ID],
            [Is_Template],
            [User],
            [Contact_ID],
            [DisplayID]
      ) output [inserted].[Id] INTO @output([Id])
VALUES
      (
            @Types_id,
            @Types_id,
            @Description,
            @Description,
            3,
            isnull(@Organization_id, 28),
            getutcdate(),
            @Plan_start_date,
            isnull(
                  @Plan_finish_at,
                  (DATEADD(DAY, 14, @Plan_start_date))
            ),
            @Priority,
            @Report_action_id,
            @Fact_finish_at,
            @Diameters_ID,
            0,
            @User,
            @contact_id,
            1 
      );
SET
      @Claim_Number = (
            SELECT
                  TOP 1 [Id]
            FROM
                  @output
      );

UPDATE
      [dbo].[Claims]
SET
      Claim_Number = @Claim_Number,
      [Claim_class_ID] = (
            SELECT
                  [Claim_class_ID]
            FROM
                  [dbo].[Claim_types]
            WHERE
                  Claim_types.Id = @Types_id
      ),
      [Priority] = isnull(
            @Priority,
            isnull(
                  (
                        SELECT
                              [Priority]
                        FROM
                              [dbo].[Claim_types]
                        WHERE
                              Claim_types.Id = @Types_id
                  ),
                  5
            )
      )
WHERE
      Id = @Claim_Number;

INSERT INTO
      [dbo].[Claim_Order_Places] (
            [Claim_ID],
            [Place_ID],
            [Flats_ID],
            [Is_first_place],
            Date_insert
      )
VALUES
      (
            @Claim_Number,
            @places_id,
            @Flats_ID,
            1,
            getutcdate()
      );

INSERT INTO
      [dbo].[Orders] (
            [Claim_ID],
            [Created_at],
            [Overtime],
            Status_ID
      ) output inserted.Id INTO @ord_table (Id)
SELECT
      @Claim_Number,
      GETUTCDATE(),
      [Overtime],
      7
FROM
      [dbo].[Orders]
WHERE
      Claim_ID = @temp_id;
SET
      @ord_id = (
            SELECT
                  TOP 1 Id
            FROM
                  @ord_table
      );
INSERT INTO
      [dbo].[Claim_Order_Places] (
            [Claim_ID],
            Orders_Id,
            [Place_ID],
            [Flats_ID],
            [Is_first_place],
            [Is_demage_place],
            [Demage_place_description],
            [Lattitude],
            [Longitude],
            Date_insert
      )
SELECT
      @Claim_Number,
      @ord_id,
      @places_id,
      [Flats_ID],
      [Is_first_place],
      [Is_demage_place],
      [Demage_place_description],
      [Lattitude],
      [Longitude],
      getutcdate()
FROM
      dbo.Claim_Order_Places
WHERE
      [Claim_ID] = @temp_id
      AND [Is_first_place] != 1;
INSERT INTO
      [dbo].[Actions] (
            [Claim_ID],
            [Order_ID],
            [Action_type_ID],
            [Place_ID],
            [Sort_index],
            [Is_Goal],
            [Diameters_ID],
            [Value]
      )
SELECT
      @Claim_Number,
      @ord_id,
      [Action_type_ID],
      [Place_ID],
      [Sort_index],
      [Is_Goal],
      [Diameters_ID],
      [Value]
FROM
      [dbo].[Actions]
WHERE
      Claim_ID = @temp_id;

SELECT
      @Claim_Number AS [Id];

RETURN;