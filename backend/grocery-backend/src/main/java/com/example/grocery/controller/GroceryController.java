package com.example.grocery.controller;

import com.example.grocery.model.GroceryItem;
import com.example.grocery.repository.GroceryRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/groceries")
@CrossOrigin(origins = "*")
public class GroceryController {

    private final GroceryRepository repository;

    public GroceryController(GroceryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<GroceryItem> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public GroceryItem add(@RequestBody GroceryItem item) {
        return repository.save(item);
    }

    @PutMapping("/{id}")
    public GroceryItem update(@PathVariable Long id, @RequestBody GroceryItem item) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setQuantity(item.getQuantity());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Item not found with id " + id));
    }



    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
