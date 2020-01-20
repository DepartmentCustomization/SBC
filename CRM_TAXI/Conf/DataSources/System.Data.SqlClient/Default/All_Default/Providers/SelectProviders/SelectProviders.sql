SELECT
    Id,
    [provider],
    provider_conditions
FROM
    dbo.Providers
WHERE
    Id = @Id;