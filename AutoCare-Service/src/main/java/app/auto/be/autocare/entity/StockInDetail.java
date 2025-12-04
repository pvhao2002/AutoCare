package app.auto.be.autocare.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "stock_in_detail")
public class StockInDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_in_id")
    private StockIn stockIn;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    private Integer quantity;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;
}

