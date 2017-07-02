package com.shop.database.services.impl;

import com.shop.database.entities.Object;
import com.shop.database.entities.ObjectType;
import com.shop.database.entities.Parameter;
import com.shop.database.entities.Reference;
import com.shop.database.exceptions.RegistrationException;
import com.shop.database.repositories.ObjectRepository;
import com.shop.database.repositories.ParameterRepository;
import com.shop.database.services.ObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <code>ObjectServiceImpl</code> is a service class for working with object entities.
 */
@Service
public class ObjectServiceImpl implements ObjectService {

    @Autowired
    private ObjectRepository objectRepository;
    @Autowired
    private ParameterRepository parameterRepository;

    public Object save(Object object) throws RegistrationException {
        for (Parameter param : object.getParameters()) {
            if (param.getAttribute().isUnique()) {
                for (Parameter par : parameterRepository.findByAttribute(param.getAttribute())) {
                    if (param.getValue().equals(par.getValue())) {
                        throw new RegistrationException();
                    }
                }
            }
        }
        return objectRepository.saveAndFlush(object);
    }

    public Object findById(int id) {
        Object o = objectRepository.findOne(id);
        for (Parameter p : o.getParameters()) {
            o.getMapParameters().put(p.getAttribute().getName(), p);
        }
        return o;
    }

    public List<Object> findByName(String name) {
        List<Object> objects = objectRepository.findByName(name);
        for (Object obj : objects) {
            for (Parameter par : obj.getParameters()) {
                obj.getMapParameters().put(par.getAttribute().getName(), par);
            }
        }
        return objects;
    }

    public List<Object> findByObjectType(ObjectType objectType) {
        List<Object> objects = objectRepository.findByObjectType(objectType);
        for (Object o : objects) {
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

    @Override
    public Page<Object> findByNameContaining(String keyword, Pageable pageable) {
        Page<Object> objects = objectRepository.findByNameContaining(keyword, pageable);
        for (Object o : objects) {
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

    @Override
    public List<Object> findByNameAttrAndObjectType(String name, String otName, String value) {
        List<Object> objects = objectRepository.findByAttrAndObjectType(name, otName, value);
        for (Object o : objects) {
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

    @Override
    public List<Object> findByParent(Object object) {
        List<Object> objects = objectRepository.findByParent(object);
        for (Object o : objects) {
            List<Reference> refs = o.getReferences();
            for (Reference r : refs) {
                Object refObject = r.getRefObject();
                for (Parameter p : refObject.getParameters()) {
                    refObject.getMapParameters().put(p.getAttribute().getName(), p);
                }
            }
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

    @Override
    public void delete(int id) {
        objectRepository.delete(id);
    }

    @Override
    public List<Object> getObjectByAttribute(String typeName, String name, Pageable pageable) {
        List<Object> objects =  objectRepository.findByAttrAndName(typeName, name, pageable);
        for (Object o : objects) {
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

    @Override
    public Page<Object> getObjectByTypes(List<String> names, Pageable pageable) {
        Page<Object> objects =  objectRepository.findByTypes(names, pageable);
        for (Object o : objects) {
            for (Parameter p : o.getParameters()) {
                o.getMapParameters().put(p.getAttribute().getName(), p);
            }
        }
        return objects;
    }

}
