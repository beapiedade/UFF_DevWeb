import '../App.css'; 

function Paginacao({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginacao">
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            &laquo;
          </a>
        </li>

        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginacao;