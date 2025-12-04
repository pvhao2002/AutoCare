package app.auto.be.autocare.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "stock_out_detail")
public class StockOutDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stock_out_id")
    private StockOut stockOut;

    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material;

    private Integer quantity;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;
}
