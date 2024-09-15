namespace carManagement.Models
{
    public class OrderRequest
    {
        public int CarId { get; set; }
        public int UserId { get; set; }
        public int BranchId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsPurchase { get; set; }
        public Branch Branch { get; internal set; }
    }
}
