package com.example.grocery.repository;

import com.example.grocery.model.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroceryRepository extends JpaRepository<GroceryItem, Long> {}
