# 📚 Sách Kiến trúc Hệ thống lớn / System Architecture Books

Thiết kế hệ thống chịu tải cao và mở rộng (scalability) đòi hỏi sự kết hợp giữa lý thuyết khoa học máy tính và kinh nghiệm thực chiến. Dưới đây là lộ trình học qua sách phân theo 4 tầng từ cơ bản đến nâng cao.

Designing high-throughput, highly available, and scalable systems requires a blend of computer science theory and real-world production experience. Below is a structured 4-tier learning path through classic textbooks.

---

## 🏛️ Tầng 1 — Nền tảng tư duy kiến trúc / Tier 1 — Architecture Thinking Foundations

Các cuốn sách giúp xây dựng tư duy kiến trúc, nguyên tắc thiết kế code sạch và SOLID trước khi đi vào phân tán.

Build architecture mindset, SOLID design principles, and clean code fundamentals before diving into distributed systems.

### 1. Fundamentals of Software Architecture (Mark Richards & Neal Ford)
*   **Mô tả / Description:**
    *   *VI:* Cuốn sách đầu tiên cung cấp cái nhìn toàn diện về mọi khía cạnh của software architecture: các đặc tính kiến trúc (characteristics), patterns, cách xác định component, đến mô hình hóa sơ đồ (diagramming) và kiến trúc tiến hóa (evolutionary architecture). Điểm khởi đầu tốt nhất để chuyển từ developer sang architect.
    *   *EN:* A comprehensive textbook covering all aspects of software architecture: architectural characteristics, patterns, component determination, system diagramming, and evolutionary design. The best starting point for transitioning from developer to architect.

### 2. Clean Architecture (Robert C. Martin)
*   **Mô tả / Description:**
    *   *VI:* Đúc kết kinh nghiệm của "Uncle Bob" về SOLID principles, clean design, dependency rules, và ranh giới kiến trúc (boundaries). Nền tảng bắt buộc phải đọc.
    *   *EN:* Synthesizes Robert C. Martin's principles of SOLID, clean design, dependency rules, and architectural boundaries. An absolute prerequisite for software engineering.

### 3. Software Architecture: The Hard Parts (Neal Ford, Mark Richards...)
*   **Mô tả / Description:**
    *   *VI:* Đi sâu vào các phân tích đánh đổi (trade-offs) phức tạp trong thực tế: khi nào nên tách service, khi nào gộp, quản lý sở hữu dữ liệu (data ownership), giao dịch phân tán (saga patterns).
    *   *EN:* Deep dives into complex architectural tradeoffs: service orchestration vs. choreography, data ownership, transactional boundaries, and saga patterns.

---

## 🌐 Tầng 2 — Hệ thống phân tán & Khả năng mở rộng / Tier 2 — Distributed Systems & Scalability

Hiểu cách dữ liệu được lưu trữ, đồng bộ và truyền tải ở quy mô hàng triệu người dùng.

Learn how data is replicated, partitioned, and processed at a scale of millions of active users.

### 1. Designing Data-Intensive Applications (Martin Kleppmann)
*   **Mô tả / Description:**
    *   *VI:* Cuốn sách kinh điển số 1 ngành công nghiệp. Kleppmann giải thích cặn kẽ về replication, partitioning, consistency, consensus, stream processing qua các kịch bản thực tế sinh động.
    *   *EN:* The undisputed industry-standard textbook. Kleppmann details database internals, replication, partitioning, consistency models, consensus algorithms, and stream processing.

### 2. Understanding Distributed Systems (Roberto Vitillo)
*   **Mô tả / Description:**
    *   *VI:* Ngắn gọn, súc tích và cập nhật hơn DDIA — cực kỳ phù hợp để đọc nhanh nắm bắt tổng quan về giao tiếp mạng, bảo mật và lưu trữ phân tán.
    *   *EN:* Concise, straightforward, and highly readable guide covering networking, data storage, security, and consensus in distributed environments.

### 3. The Art of Scalability (Martin Abbott & Michael Fisher)
*   **Mô tả / Description:**
    *   *VI:* Cung cấp cách tiếp cận có cấu trúc để phân tích và khắc phục các điểm nghẽn về scale (scale cube) ở các tầng khác nhau của stack, bao gồm cả thách thức kỹ thuật lẫn quản lý tổ chức.
    *   *EN:* Offers a structured approach (Scale Cube) to identifying and eliminating scaling bottlenecks across technical, organizational, and process dimensions.

### 4. Distributed Systems (Maarten van Steen & Andrew Tanenbaum)
*   **Mô tả / Description:**
    *   *VI:* Cuốn sách học thuật kinh điển cung cấp nền tảng lý thuyết vững chắc về tính chịu lỗi (fault-tolerance), cơ chế bên dưới của các kiến trúc phân tán và truyền nhận tin nhắn.
    *   *EN:* An academic classic providing a rigorous theoretical foundation on fault-tolerance, distributed coordination, and underlying networking mechanics.

---

## 🛠️ Tầng 3 — Patterns & Microservices / Tier 3 — Patterns & Microservices

Thiết kế các hệ thống hướng dịch vụ và mô hình hóa nghiệp vụ nghiệp nghiệp vụ phức tạp.

Designing service-oriented architectures and modeling complex business domains.

### 1. Building Microservices (Sam Newman, 2nd Ed.)
*   **Mô tả / Description:**
    *   *VI:* Cuốn sách chuẩn mực nhất về microservices — bao gồm service boundaries, cơ chế truyền thông, deployment, testing và bảo mật microservices.
    *   *EN:* The definitive guide to microservices, covering service boundaries, communication protocols, deployment, testing, and security.

### 2. Enterprise Integration Patterns (Gregor Hohpe & Bobby Woolf)
*   **Mô tả / Description:**
    *   *VI:* Danh mục các mẫu tích hợp hệ thống qua tin nhắn (messaging), là nền tảng cốt lõi cho các kiến trúc hướng sự kiện (event-driven architecture) hiện đại.
    *   *EN:* A catalog of system integration patterns using messaging, serving as the foundational blueprint for modern event-driven architectures.

### 3. Domain-Driven Design (Eric Evans) + Implementing DDD (Vaughn Vernon)
*   **Mô tả / Description:**
    *   *VI:* Kỹ thuật mô hình hóa nghiệp vụ phần mềm phức tạp với các khái niệm Bounded Context, Aggregates, Ubiquitous Language — chìa khóa phân rã microservices chuẩn xác.
    *   *EN:* Domain modeling techniques for complex systems using Bounded Contexts, Aggregates, and Ubiquitous Language — key to proper microservices decomposition.

### 4. System Design Interview Vol. 1 & 2 (Alex Xu)
*   **Mô tả / Description:**
    *   *VI:* Học qua case study thực tế: cách thiết kế các hệ thống nổi tiếng như YouTube, Twitter, Uber, Notion, Google Maps... Rất trực quan và dễ tiếp cận.
    *   *EN:* Learn through real-world case studies: designing YouTube, Twitter, Uber, Notion, Google Maps, and more. Visual, concise, and highly practical.

---

## 🚀 Tầng 4 — Chuyên sâu & Nâng cao / Tier 4 — Advanced & In-Depth

Đảm bảo hệ thống vận hành bền bỉ trong môi trường sản xuất thực tế (production).

Ensuring your system operates reliably and evolves gracefully in production environments.

### 1. Building Evolutionary Architectures (Neal Ford, Rebecca Parsons...)
*   **Mô tả / Description:**
    *   *VI:* Tiếp cận kiến trúc như một thực thể sống có thể tiến hóa liên tục nhờ các hàm kiểm tra độ phù hợp (fitness functions), continuous delivery và thiết kế modularity.
    *   *EN:* Treats architecture as a living system capable of guided, incremental evolution using fitness functions, continuous delivery, and modular design.

### 2. Release It! (Michael Nygard)
*   **Mô tả / Description:**
    *   *VI:* Cuốn sách bắt buộc phải đọc về vận hành thực tế. Giới thiệu các mẫu ổn định hệ thống: Circuit Breaker, Bulkhead, Timeout, Back Pressure để sống sót trước lỗi dây chuyền.
    *   *EN:* A must-read on real-world systems operations. Introduces stability patterns like Circuit Breaker, Bulkhead, Timeout, and Backpressure to survive cascading failures.

### 3. 97 Things Every Software Architect Should Know (O'Reilly)
*   **Mô tả / Description:**
    *   *VI:* Tập hợp 97 lời khuyên và góc nhìn thực chiến từ các kiến trúc sư phần mềm hàng đầu thế giới về công nghệ, con người và quản lý dự án.
    *   *EN:* A collection of 97 practical tips and insights from top software architects worldwide, covering technology, communication, and project management.
