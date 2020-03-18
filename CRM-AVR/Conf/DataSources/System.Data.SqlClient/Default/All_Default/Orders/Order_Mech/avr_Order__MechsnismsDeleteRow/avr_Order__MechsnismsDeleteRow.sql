-- DECLARE @Id INT = 26;

DECLARE @OrderID INT = (SELECT Orders_Id FROM dbo.Moves WHERE Id = @Id);
DECLARE @ClaimID INT = (SELECT Claim_ID FROM dbo.Orders WHERE Id = @OrderID);

DECLARE @ClaimStatus INT = (SELECT Status_ID FROM dbo.Claims WHERE Id = @ClaimID);
DECLARE @OrderStatus INT = (SELECT Status_ID FROM dbo.Orders WHERE Id = @OrderID);

---> Когда заявка и выезд не в статусе закрыто - пропускаем удаление 
IF (@OrderStatus <> 10) AND (@ClaimStatus <> 5)
 BEGIN
       DELETE
       FROM dbo.Moves 
       WHERE Id = @Id ;

 END
---> Если выезд закрыт, а заявка нет
ELSE IF (@OrderStatus = 10) AND (@ClaimStatus <> 5)
 BEGIN
    RAISERROR('Виїзд закрито, видалення заборонено',16,1);
  END
---> Если заявка закрыта, а выезд нет
ELSE IF (@OrderStatus <> 10) AND (@ClaimStatus = 5)
 BEGIN
 	RAISERROR('Заявку закрито, видалення заборонено',16,1);
  END
---> Если заявка закрыта и выезд закрыты
ELSE IF (@OrderStatus = 10) AND (@ClaimStatus = 5)
 BEGIN
 	RAISERROR('Заявку та виїзд закрито, видалення заборонено',16,1);
  END