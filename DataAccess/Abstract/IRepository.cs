namespace DataAccess.Abstract
{
    public interface IRepository<T>
    {
        public T GetById(int id);
        public List<T> GetAll();
        public void Create(T entity);
        public void Update(T entity);
        public void Delete(T entity);
    }
}
