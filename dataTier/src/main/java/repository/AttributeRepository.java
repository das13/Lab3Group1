package repository;

import entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by said on 02.05.2017.
 */
public interface AttributeRepository extends JpaRepository<Attribute, Integer> {
}