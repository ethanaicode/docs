# **Python NumPy 全面教程**

## **1. NumPy 简介**

### 1.1 什么是 NumPy

NumPy（Numerical Python）是 Python 语言的一个基础科学计算库，提供了高性能的多维数组对象 `ndarray`，以及对数组进行快速操作的工具。
它是数据科学、机器学习、科学计算领域的核心库之一。

**主要特点：**

- 高效的 N 维数组对象
- 向量化运算（批量处理数据，而不是使用 Python 循环）
- 大量数学函数（矩阵运算、线性代数、傅里叶变换等）
- 与其他科学计算库（Pandas、Matplotlib、SciPy）无缝结合

### 1.2 NumPy 与 Python 列表的比较

| 对比项   | Python 列表        | NumPy 数组        |
| -------- | ------------------ | ----------------- |
| 存储方式 | 以对象指针形式存储 | 连续的内存块      |
| 数据类型 | 可以混合类型       | 必须相同类型      |
| 运算效率 | 低（循环执行）     | 高（底层 C 实现） |
| 功能     | 基础存储结构       | 高效数值计算      |

总结来说，NumPy 数组在**存储效率和运算速度**上远远优于 Python 列表。

### 1.3 安装与导入

```python
pip install numpy
import numpy as np
```

## **2. NumPy 基础**

### 2.1 创建数组

```python
import numpy as np

# 从列表创建
arr1 = np.array([1, 2, 3])
# 从嵌套列表创建二维数组
arr2 = np.array([[1, 2], [3, 4]], dtype=float)
```

### 2.2 数组属性

```python
print(arr2.ndim)     # 维度
print(arr2.shape)    # 形状 (行, 列)
print(arr2.size)     # 元素个数
print(arr2.dtype)    # 数据类型
print(arr2.itemsize) # 每个元素的字节数
```

### 2.3 数据类型与转换

```python
arr = np.array([1, 2, 3], dtype=np.float32)
arr2 = arr.astype(np.int32)  # 转换类型
```

## **3. 数组创建方法**

### 3.1 基于数值范围

```python
np.arange(0, 10, 2)   # [0, 2, 4, 6, 8]
np.linspace(0, 1, 5)  # [0., 0.25, 0.5, 0.75, 1.]
```

### 3.2 特殊数组

```python
np.zeros((2, 3))      # 全 0 数组
np.ones((2, 3))       # 全 1 数组
np.empty((2, 3))      # 未初始化数组
np.full((2, 3), 7)    # 全 7 数组
```

### 3.3 随机数组

```python
np.random.rand(2, 3)        # 均匀分布 [0,1)
np.random.randint(0, 10, 5) # 整数随机数
np.random.randn(3, 3)       # 标准正态分布
np.random.seed(42)          # 固定随机数
```

### 3.4 矩阵

```python
np.eye(3)        # 单位矩阵
np.identity(4)   # 4x4 单位矩阵
```

## **4. 数组索引与切片**

```python
arr = np.arange(10)
print(arr[2:5])       # 切片
print(arr[::-1])      # 反转
print(arr[[1, 3, 5]]) # 花式索引
print(arr[arr > 5])   # 布尔索引
```

二维数组：

```python
mat = np.array([[1,2,3],[4,5,6],[7,8,9]])
print(mat[0, 2])      # 第一行第三列
print(mat[0:2, 1:3])  # 切片
```

## **5. 数组操作**

### 5.1 形状变换

```python
a = np.arange(6).reshape(2, 3)
a_flat = a.ravel()   # 展平（视图）
a_copy = a.flatten() # 展平（副本）
```

### 5.2 拼接与分割

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6]])

np.vstack((a, b))      # 竖直拼接
np.hstack((a, b.T))    # 水平拼接
np.split(a, 2)         # 分割
```

### 5.3 添加与删除

```python
np.append(a, [[7, 8]], axis=0)
np.insert(a, 1, [9, 9], axis=0)
np.delete(a, 0, axis=0)
```

## **6. 数组运算**

### 6.1 广播与算术运算

```python
arr = np.array([1, 2, 3])
print(arr + 10)  # 每个元素加 10
print(arr * 2)   # 每个元素乘 2
```

### 6.2 通用函数

```python
np.sqrt(arr)      # 开方
np.exp(arr)       # e^x
np.log(arr)       # 自然对数
np.sin(arr)       # 正弦
```

### 6.3 比较与逻辑运算

```python
np.greater(arr, 2)
np.logical_and(arr > 1, arr < 3)
```

## **7. 统计与数学**

```python
a = np.array([1, 2, 3, 4, 5])
np.sum(a)        # 总和
np.mean(a)       # 平均值
np.median(a)     # 中位数
np.std(a)        # 标准差
np.var(a)        # 方差
np.min(a)        # 最小值
np.max(a)        # 最大值
np.argmin(a)     # 最小值索引
np.argmax(a)     # 最大值索引
```

## **8. 矩阵与线性代数**

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[2, 0], [1, 3]])

np.dot(A, B)          # 矩阵乘法
np.linalg.inv(A)      # 逆矩阵
np.linalg.det(A)      # 行列式
np.linalg.eig(A)      # 特征值与特征向量
np.linalg.solve(A, [1, 2]) # 解方程组
```

## **9. 广播机制**

**规则：**

1. 如果两个数组的维度数不同，低维数组的形状会在前端补 1
2. 如果两个数组的形状在某个维度不匹配，且其中一个为 1，则可以广播
3. 否则抛出错误

```python
a = np.array([[1,2,3],[4,5,6]])
b = np.array([1,2,3])
print(a + b)
```

## **10. 文件读写**

```python
np.save('data.npy', arr)
arr2 = np.load('data.npy')

np.savetxt('data.txt', arr, fmt='%d')
arr3 = np.loadtxt('data.txt', dtype=int)
```

## **11. 高级功能**

```python
arr = np.arange(10)
view = arr[::2]         # 视图
copy = arr[::2].copy()  # 副本

np.sort(arr)
np.argsort(arr)
np.unique([1, 2, 2, 3])
```

## **12. 与其他库结合**

- Pandas：`pd.DataFrame(np_array)`
- Matplotlib：`plt.plot(np_array)`
- SciPy：高级数学计算

## **13. 常见错误**

- **形状不匹配**：广播规则不满足
- **类型错误**：混合类型导致转换
- **索引越界**：超出范围

## **14. 实战案例**

### 14.1 数据标准化

```python
arr = (arr - arr.mean()) / arr.std()
```

### 14.2 图像处理

```python
import matplotlib.image as mpimg
img = mpimg.imread('image.png')
gray = img.mean(axis=2)
```

### 14.3 随机模拟

```python
np.random.choice([1, 2, 3], size=10, p=[0.2, 0.5, 0.3])
```

## **15. 参考资料**

- [NumPy 官方文档](https://numpy.org/doc/stable/)
- [NumPy 教程 - w3schools](https://www.w3schools.com/python/numpy_intro.asp)
