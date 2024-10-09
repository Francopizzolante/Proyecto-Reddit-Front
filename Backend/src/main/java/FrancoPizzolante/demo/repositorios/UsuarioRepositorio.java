package FrancoPizzolante.demo.repositorios;

import FrancoPizzolante.demo.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
}
